import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStatusEntity } from '@/domains/user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

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
      let status = this.repository.create({
        description: "User created",
        createdAt: new Date(),
        isActive: true
      });
      status = await this.repository.save(status);

      return status;
    } catch(error) {
      console.error("[UserStatusService::getOrCreateStatus]")
      console.error(error);
      throw new RuntimeException("Error creating User Status");
    }
  }

  async update(id, status): Promise<UserStatusEntity> {
    let exists = await this.repository.findOne({ where: { id }});
    if(!exists) {
      exists = await this.create();
    }

    try {
      exists = {
        ...exists,
        updatedAt: new Date()
      }

      let res = await this.repository.update(id, exists);

      const result = { ...exists, updatedAt: res.raw };

      console.log("result: ", result);

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
      status.deletedAt = new Date();
      status.isActive = false;

      await this.repository.update(status.id, status);

      return status;
    } catch(error) {
      console.error("[UserStatusService::delete] Error while removing status");
      console.error(error);
      throw new RuntimeException("Error removing status")
    }
  }
}
