import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Order } from "@/utils";

export class PageMetaDto {
  @ApiProperty({ name: "currentPage", type: Number, description: "Current page number" })
  readonly currentPage: number;

  @ApiProperty({ name: "itemsPerPage", type: Number, description: "Itens number that will be fetcheded" })
  readonly itemsPerPage: number;

  @ApiProperty({ name: "itemCount", type: Number, description: "Total itens count" })
  readonly itemCount: number;

  @ApiProperty({ name: "totalPages", type: Number, description: "Total number of pages with the itensPerPage quantity" })
  readonly totalPages: number;

  @ApiProperty({ name: "hasPreviousPage", type: Number, description: "There is more page before the current one" })
  readonly hasPreviousPage: boolean;

  @ApiProperty({ name: "hasNextPage", type: Number, description: "There is more page after the current one" })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
   if(pageOptionsDto.page) this.currentPage = pageOptionsDto.page;
   if (pageOptionsDto.take) this.itemsPerPage = pageOptionsDto.take;
   this.itemCount = itemCount;
   this.totalPages = Math.ceil(this.itemCount / this.itemsPerPage)
   this.hasPreviousPage = this.currentPage > 1;
   this.hasNextPage = this.currentPage < this.totalPages;
  }
}

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    if (this.page && this.take) {
      return (this.page - 1) * this.take;
    }
    return 0;
  }

}
