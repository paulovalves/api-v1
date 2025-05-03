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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
@ApiTags('User')
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
  @Post('create')
  @ApiOperation({
    summary: 'Adiciona um novo usuário',
    description: 'Cria um novo usuário com os dados fornecidos.',
    responses: {
      201: {
        description: 'Usuário criado com sucesso',
      },
      500: {
        description: 'Erro ao criar usuário',
      },
    },
  })
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
  @Get('users')
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista de todos os usuários cadastrados.',
    responses: {
      200: {
        description: 'Usuários encontrados com sucesso',
      },
      500: {
        description: 'Erro ao buscar usuários',
      },
    },
  })
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
        .json({ message: 'Erro ao buscar usuários', data: {} });
    }
  }

  /**
   * Retrieves a user by ID.
   * @param {UserFilterEntity} filter - The ID of the user to retrieve.
   * @param {Response} res - The response object.
   *
   * @returns {Promise<Response>} - A promise that resolves with the user data.
   */
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description: 'Retorna os dados de um usuário específico.',
    responses: {
      200: {
        description: 'Usuário encontrado com sucesso',
      },
      500: {
        description: 'Erro ao buscar usuário',
      },
    },
  })
  @Post('user')
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

  /**
   * Updates a user.
   * @param {UpdateUserDto} updateUserDto - The user data to update.
   * @param {Response} res - The response object.
   *
   * @returns {Promise<Response>} - A promise that resolves when the user is updated.
   */
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza os dados de um usuário existente.',
    responses: {
      200: {
        description: 'Usuário atualizado com sucesso',
      },
      500: {
        description: 'Erro ao atualizar usuário',
      },
    },
  })
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response = await this.userService.update(updateUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'Usuário atualizado com sucesso',
        data: response,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro ao atualizar usuário', data: {} });
    }
  }

  /**
   * Deletes a user by ID.
   * @param {string} id - The ID of the user to delete.
   * @param {Response} res - The response object.
   *
   * @returns {Promise<Response>} - A promise that resolves when the user is deleted.
   */
  @ApiOperation({
    summary: 'Remover usuário',
    description: 'Remove um usuário específico pelo ID.',
    responses: {
      200: {
        description: 'Usuário removido com sucesso',
      },
      500: {
        description: 'Erro ao remover usuário',
      },
    },
  })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response = await this.userService.remove(Number(id));
      return res.status(HttpStatus.OK).json({
        message: 'Usuário removido com sucesso',
        data: response,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro ao remover o usuário', data: {} });
    }
  }
}
