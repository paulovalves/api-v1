import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutputDto } from '@/domains/user/dto/user.output.dto';
import { UserEntity } from '@/domains/user/entities/user.entity';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFilterEntity } from '@/domains/user/filters/user-filter.entity';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserOutputDto> {
    try {
      const exists = await this.userRepository.exists({ where: { email: createUserDto.email } });
      if (exists) {
        throw new RuntimeException('Erro ao criar usuário');
      }
      const user = new UserEntity();
      user.toUser(createUserDto);
      const userCreated = await this.userRepository.save(user);
      const userOutput = UserOutputDto.toUserOutputDto(userCreated);

      return userOutput;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }

  async findAll(): Promise<UserOutputDto[]> {
    try {
      const users = await this.userRepository.find();
      const usersOutput = users
        .map((user) => UserOutputDto
        .toUserOutputDto(user));
      return usersOutput;
    } catch (error) {
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }



  async findOne(filter: UserFilterEntity): Promise<UserOutputDto> {
    try {
      const user = await this.userRepository
        .findOne({ where: UserFilterEntity.queryBuilder(filter) });
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

  update(id: number, updateUserDto: UpdateUserDto): UserOutputDto {
    return new UserOutputDto(1, '', '', UserRoleEntity.fromId(1));
  }

  remove(id: number): boolean {
    return true;
  }
}
