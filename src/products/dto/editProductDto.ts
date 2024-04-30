import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditProductDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;
}
