import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseApiController } from '@/domains/common/base-api.controller';
import { UserFilterEntity } from '@/domains/user/filters/user-filter.entity';

/**
 * Controller for managing users.
 * Handles user creation, retrieval, update, and deletion.
 * @Controller('user')
 * @class UserController
 * @extends BaseApiController
 * @constructor
 * @param {UserService} userService - The user service instance.
 *
 */
@Controller('user')
export class UserController extends BaseApiController {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   * Creates a new user.
   * @param {CreateUserDto} createUserDto - The user data to create.
   * @param {Response} res - The response object.
   *
   * @returns {Promise<Response>} - A promise that resolves when the user is created.
   */
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response = await this.userService.create(createUserDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Usuário criado com sucesso', data: response });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error, data: {} });
    }
  }

  /**
   * Retrieves all users.
   * @param {Response} res - The response object.
   *
   * @returns {Promise<Response>} - A promise that resolves with the list of users.
   */
  @Get('find')
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const response = await this.userService.findAll();
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Usuários encontrados com sucesso', data: response });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro ao encontrar usuários', data: {} });
    }
  }

  /**
   * Retrieves a user by ID.
   * @param {UserFilterEntity} filter - The ID of the user to retrieve.
   * @param {Response} res - The response object.
   *
   * @returns {Promise<Response>} - A promise that resolves with the user data.
   */
  @Post('find')
  async findOne(
    @Body() filter: UserFilterEntity,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response = await this.userService.findOne(filter);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Usuário encontrado com sucesso', data: response });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro ao encontrar usuário', data: {} });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
