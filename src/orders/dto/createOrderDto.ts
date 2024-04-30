import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { ProductDto } from './productDto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
	@IsString()
	customer_name: string;

	@IsString()
	phone: string;

	@IsBoolean()
	usedelivery: boolean;

	@IsString()
	city: string;

	@IsOptional()
	comment: string;

	@IsString()
	department: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductDto)
	products: ProductDto[];

	@IsNumber()
	price: number;
}
