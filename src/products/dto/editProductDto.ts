import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsArrayOfStringArrays } from './IsArrayOfStringArrays';

export class EditProductDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsBoolean()
	discontinued?: boolean;

	@IsOptional()
	@IsNumber()
	price?: number;

	@IsOptional()
	@IsString()
	color?: string;

	@IsOptional()
	@IsArrayOfStringArrays({
		message: 'значення повинно бути масив масивів рядків',
	})
	value: any;
}
