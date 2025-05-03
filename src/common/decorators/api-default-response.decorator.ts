// src/common/decorators/api-default-response.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiResponse as OpenApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ApiResponseEntity } from '@/domains/common/entities/app-response.entity';

export const ApiResponse = <TModel extends Type<any>>(
  statusCode: number,
  description: string,
  message: string,
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseEntity, model),
    OpenApiResponse({
      status: statusCode,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseEntity) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiErrorResponse = (description = 'Erro interno') =>
  OpenApiResponse({
    status: 500,
    description,
    schema: {
      example: {
        message: 'Erro ao processar requisição',
        data: {},
      },
    },
  });
