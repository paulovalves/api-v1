import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './index';
import { UserFilterEntity } from './filters/user-filter.entity';
import { Response } from 'express';
import { UserRoleEntity } from './entities/user-role.entity';

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, name: 'Test', email: 'test@mail.com' }]),
    findOne: jest.fn(() => ({ id: 1, name: 'Test', email: 'test@mail.com' })),
    update: jest.fn(() => ({ id: 1, name: 'Updated' })),
    remove: jest.fn(() => ({ deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const res = mockResponse();
    const dto: CreateUserDto = {
      name: 'John',
      email: 'john@mail.com',
      password: '1234',
      role: UserRoleEntity.fromId(1),
    };
    await controller.create(dto, res);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
      data: expect.any(Object),
    });
  });

  it('should get all users', async () => {
    const res = mockResponse();
    await controller.findAll(res);
    expect(service.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
      data: expect.any(Array),
    });
  });

  it('should get one user by filter', async () => {
    const res = mockResponse();
    const filter: UserFilterEntity = {
      id: 1,
      isActive: null,
      name: null,
      email: null,
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
    };
    await controller.findOne(filter, res);
    expect(service.findOne).toHaveBeenCalledWith(filter);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
      data: expect.any(Object),
    });
  });

  it('should update a user', async () => {
    const res = mockResponse();
    const dto: UpdateUserDto = {
      id: 1,
      name: 'Updated',
      email: 'any@email.com',
      password: '1234',
      role: UserRoleEntity.fromId(1),
    };
    const result = await controller.update(dto, res);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ id: 1, name: 'Updated' });
  });

  it('should delete a user', async () => {
    const res = mockResponse();
    const result = await controller.remove('1', res);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });
});
