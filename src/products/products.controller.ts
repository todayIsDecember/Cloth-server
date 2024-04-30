import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProductDto';
import { ProductsService } from './products.service';
import { EditProductDto } from './dto/editProductDto';
import { PRODUCT_NOT_FOUND_ERROR } from './products.constants';
import { IProduct } from 'interfaces/product.interface';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}
	// стоврити продукт
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: CreateProductDto): Promise<IProduct> {
		return this.productsService.create(dto);
	}

	// отримати всі активні продукти
	@HttpCode(200)
	@Get('all')
	async getAll(): Promise<IProduct[]> {
		return this.productsService.getAll();
	}

	// отримати всі продукти
	@HttpCode(200)
	@Get('allWithDiscontinued')
	async allWithDiscontinued(): Promise<IProduct[]> {
		return this.productsService.allWithDiscontinued();
	}

	//отримати продукти за категорією
	@HttpCode(200)
	@Post('getByCategory')
	async getByCategory(@Body() dto: Pick<CreateProductDto, 'category'>): Promise<IProduct[]> {
		return this.productsService.getByCategory(dto.category);
	}

	// отримати топ 3 продукти
	@HttpCode(200)
	@Get('getTopThree')
	async getTopThree(): Promise<IProduct[]> {
		return this.productsService.getTopThree();
	}

	// отримати продукт по кольору
	@HttpCode(200)
	@Post('getByColor')
	async getByColor(@Body() dto: Pick<CreateProductDto, 'color' | 'type'>): Promise<IProduct[]> {
		return this.productsService.getByColor(dto);
	}

	// отримати всі кольори за типом
	@HttpCode(200)
	@Post('getColors')
	async getColorsByType(@Body() dto: Pick<CreateProductDto, 'type'>): Promise<string[]> {
		return this.productsService.getColorsByType(dto.type);
	}

	//отримати продукт за id
	@HttpCode(200)
	@Get('byId/:id')
	async getById(@Param('id') id: number): Promise<IProduct> {
		const product = await this.productsService.getById(id);
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	//змінити дані
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('edit/:id')
	async edit(@Body() dto: EditProductDto, @Param('id') id: number): Promise<IProduct> {
		const product = await this.productsService.getById(id);
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		return this.productsService.edit(id, dto);
	}

	//видалити продукт
	@HttpCode(200)
	@Delete('delete/:id')
	async delete(@Param('id') id: number): Promise<IProduct> {
		const product = await this.productsService.getById(id);
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		return this.productsService.delete(id);
	}
}
