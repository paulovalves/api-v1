import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseApiController } from '@/domains/common/base-api.controller';
import { UserFilterEntity } from '@/domains/user/filters/user-filter.entity';

@Controller('user')
export class UserController extends BaseApiController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const response = this.userService.create(createUserDto);
      res.status(HttpStatus.CREATED).json({ message: 'Usuário criado com sucesso', data: response }).send();
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error, data: {} }).send();
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    try {
      const response = this.userService.findAll();
      res.status(HttpStatus.OK).json({ message: 'Usuários encontrados com sucesso', data: response }).send();
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao encontrar usuários', data: {} }).send();
    }
  }

  @Post('find-one')
  findOne(@Body() filter: UserFilterEntity, @Res() res: Response) {
    try {
      const response = this.userService.findOne(filter);
      res.status(HttpStatus.OK).json({ message: 'Usuário encontrado com sucesso', data: response }).send();
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao encontrar usuário');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
