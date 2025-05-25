import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseEntity<T> {
  @ApiProperty({
    name: 'message',
    type: 'string',
    example: 'Mensagem de retorno',
  })
  message: string;

  @ApiProperty({ name: 'data' })
  data: T;
}
