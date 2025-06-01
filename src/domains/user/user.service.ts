import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserOutputDto } from '@/domains/user/dto';
import { UserEntity } from '@/domains/user/entities';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFilterEntity } from '../user/filters/user-filter.entity';
import { AuditService } from '@/common/audit/audit-log.service';
import { UserStatusService } from './user-status.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userStatusService: UserStatusService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserOutputDto> {
    try {
      const exists = await this.userRepository.exists({
        where: { email: createUserDto.email },
      });
      if (exists) {
        throw new RuntimeException(
          `Usuário com o email [${createUserDto.email}] já existe!`,
        );
      }

      const user = new UserEntity();
      const status = await this.userStatusService.create();
      user.toUser(createUserDto, status);

      const userCreated = await this.userRepository.save(user);

      const userOutput = UserOutputDto.toUserOutputDto(userCreated);

      return userOutput;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException('Erro ao criar o usuário');
    }
  }

  async findAll(): Promise<UserOutputDto[]> {
    try {
      const users = await this.userRepository.find();
      const usersOutput = users.map((user) =>
        UserOutputDto.toUserOutputDto(user),
      );
      return usersOutput;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }
   
  async findOne(filter: UserFilterEntity): Promise<UserOutputDto> {
    try {
      const user = await this.userRepository.findOne({
        where: UserFilterEntity.queryBuilder(filter),
      });
      if (!user) {
        throw new RuntimeException('Usuário não encontrado');
      }
      const userOutput = UserOutputDto.toUserOutputDto(user);
      return userOutput;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }

  async findUser(filter: UserFilterEntity): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: UserFilterEntity.queryBuilder(filter),
      });
      if (!user) {
        throw new RuntimeException('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserOutputDto> {
    try {
      const filter = new UserFilterEntity(updateUserDto, null);

      const exists = await this.findUser(filter);

      if (!exists) {
        throw new RuntimeException('Usuário não encontrado');
      }

      const user = new UserEntity();
      const status = {
        ...user.status,
        updated_at: new Date(),
      }
      
      const statusUpdated = await this.userStatusService.update(user.status.id, status);

      user.toUser(UpdateUserDto.toUpdateDto(exists), statusUpdated);
      const userUpdated = await this.userRepository.save(user);
      const userOutput = UserOutputDto.toUserOutputDto(userUpdated);
      if (!userUpdated) {
        throw new RuntimeException('Erro ao atualizar usuário');
      }
      return userOutput;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new RuntimeException('Usuário não encontrado');
      }
      const result = await this.userRepository.delete(id);
      if (!result) {
        throw new RuntimeException('Erro ao remover usuário');
      }
      return true;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }
}
