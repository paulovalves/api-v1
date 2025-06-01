import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStatusEntity } from '@/domains/user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import { UserStatusBuilder } from './builders/user-status.builder';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectRepository(UserStatusEntity)
    private readonly repository: Repository<UserStatusEntity>,
  ) {}

  async list(): Promise<UserStatusEntity[]> {
    const status = await this.repository.find();
    if(status.length === 0) {
      throw new NotFoundException({
        message: "No register Found"
      });
    }

    return status;
  }

  async findOne(id: number): Promise<UserStatusEntity | null> {
    const status = await this.repository.findOne({ where: { id }});
    return status;
  }

  async create(): Promise<UserStatusEntity> {
    try {
      let status = UserStatusBuilder
        .builder()
        .description("User created")
        .created_at(new Date())
        .is_active(true)
        .build();

      let created = this.repository.create(status);
      created = await this.repository.save(created);

      return created;

    } catch(error) {
      console.error("[UserStatusService::getOrCreateStatus]")
      console.error(error);
      throw new RuntimeException("Error creating User Status");
    }
  }

  async update(id: number, status: UserStatusEntity): Promise<UserStatusEntity> {
    let exists = await this.repository.findOne({ where: { id }});
    if(!exists) {
      exists = await this.create();
    }

    try {
      exists = {
        ...exists,
        ...status
      }

      let res = await this.repository.update(id, exists);

      const result = { ...exists, updated_at: res.raw };

      console.log("result: ", result);

      return result;

    } catch(error) {
      console.error("[UserStatusService::update]")
      console.error(error);
      throw new RuntimeException("Error updating User Status");
    }
  }

  async delete(id: number): Promise<UserStatusEntity> {
    const status = await this.repository.findOne({ where: { id }});
    if(!status) {
      throw new NotFoundException({
        message: "Status not found"
      });
    }

    try {
      status.deleted_at = new Date();
      status.is_active = false;

      await this.repository.update(status.id, status);

      return status;
    } catch(error) {
      console.error("[UserStatusService::delete] Error while removing status");
      console.error(error);
      throw new RuntimeException("Error removing status")
    }
  }
}
