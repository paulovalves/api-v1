import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserOutputDto } from '@/domains/user/dto';
import { UserEntity } from '@/domains/user/entities';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserFilterEntity } from '../user/filters/user-filter.entity';
import { UserStatusService } from './user-status.service';
import { PageDto, PageMetaDto, PageOptionsDto } from '../common/pagination';
import { Order } from '@/utils';

@Injectable()
export class UserService {
  constructor(
    private readonly _dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly _repository: Repository<UserEntity>,
    private readonly _userStatusService: UserStatusService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserOutputDto> {
      const exists = await this._repository.exists({
        where: { email: createUserDto.email },
      });
      if (exists) {
        console.error(`[UserService::create] ERROR: User with the email [${createUserDto.email}] already exists`);
        throw new RuntimeException(
          `User with the email [${createUserDto.email}] already exists!`,
        );
      }

      const user = new UserEntity();

      const status = await this._userStatusService.create();
      user.toUser(createUserDto, status);

      const queryRunner = this._dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

    try {

      await queryRunner.query(`SET LOCAL "my.current_user" = 'paulo@admin'`);
      await queryRunner.query(`SET LOCAL "my.change_reason" = 'User created'`);
      const created = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      const userOutput = UserOutputDto.toUserOutputDto(created);

      return userOutput;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('[UserService::create] ERROR: ', error);
      throw new RuntimeException(error);
      // throw new RuntimeException('Erro ao criar o usuário');
    } finally {
      await queryRunner.release();
    }
  }

  async listAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserOutputDto>> {
    try {

      const queryBuilder = this._repository
        .createQueryBuilder("users")
        .innerJoinAndSelect("users.role", "user_role")
        .innerJoinAndSelect("Users.status", "user_status");

        queryBuilder
          .orderBy("users.id", Order.ASC)
          .skip(pageOptionsDto.skip)
          .take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();

        const { entities } = await queryBuilder.getRawAndEntities();
        console.log("[UserService::listAll] found", entities);

        const dto = entities.map((user) => {
          return UserOutputDto.toUserOutputDto(user);
        })

        const page = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(dto, page);
     } catch(error) {
       console.error("[UserService::listAll]", error);
       throw new RuntimeException("ERROR: error fetching users");
     }
  }

  async findAll(): Promise<UserOutputDto[]> {
    try {
      const users = await this._repository.find();
      console.log("users: ", users);
      const usersOutput = users.map((user) =>
        UserOutputDto.toUserOutputDto(user),
      );
      return usersOutput;
    } catch (error) {
       console.error("[UserService::findAll]", error);
      console.error('ERROR: ', error);
      throw new RuntimeException(error);
    }
  }
   
  async findOne(filter: UserFilterEntity): Promise<UserOutputDto> {
    try {
      const user = await this._repository.findOne({
        where: UserFilterEntity.queryBuilder(filter),
      });
      if (!user) {
        console.error("[UserService::findOne]: User not found");
        throw new RuntimeException('Usuário não encontrado');
      }
      const userOutput = UserOutputDto.toUserOutputDto(user);
      return userOutput;
    } catch (error) {
      console.error("[UserService::findOne]", error);
      throw new RuntimeException(error);
    }
  }

  async findUser(filter: UserFilterEntity): Promise<UserEntity> {
    try {
      const user = await this._repository.findOne({
        where: UserFilterEntity.queryBuilder(filter),
      });
      if (!user) {
        console.error("[UserService::findUser]: User not found");
        throw new RuntimeException('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      console.error("[UserService::findUser]", error);
      throw new RuntimeException(error);
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserOutputDto> {
      const filter = new UserFilterEntity(updateUserDto, null);

      const existing = await this.findUser(filter);

      if (!existing) {
        console.error("[UserService::update]: User not found");
        throw new RuntimeException('Usuário não encontrado');
      }

      const user = new UserEntity();
      const status = {
        ...user.status,
        updated_at: new Date(),
        is_active: !existing.status.is_active
      }

      user.status = status;

      const queryRunner = this._dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      
    try {
      await queryRunner.query(`SET LOCAL app.current_user = $1`, ['paulo@admin']);
      await queryRunner.query(`SET LOCAL app.change_reason = $1`, ['Updated user status']);

      const saved = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      const userOutput = UserOutputDto.toUserOutputDto(saved);

      return userOutput;
    } catch (error) {
      console.error("[UserService::update]: ", error);
      throw new RuntimeException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const user = await this._repository.findOne({ where: { id } });
      if (!user) {
        throw new RuntimeException('Usuário não encontrado');
      }
      const result = await this._repository.delete(id);
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
