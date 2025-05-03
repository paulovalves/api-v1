import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseEntity<T> {
  @ApiProperty({ example: 'Mensagem de retorno' })
  message: string;

  @ApiProperty({ nullable: true })
  data: T;
}
