import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/createProductDto';
import { EditProductDto } from './dto/editProductDto';

@Injectable()
export class ProductsService {
	constructor(private readonly prismaService: PrismaService) {}

	//стоврити продукт
	async create(dto: CreateProductDto) {
		return this.prismaService.products.create({
			data: {
				price: dto.type,
				...dto,
			},
		});
	}

	//отримати всі продукти
	async getAll() {
		return this.prismaService.products.findMany({ where: { discontinued: false } });
	}

	async allWithDiscontinued() {
		return this.prismaService.products.findMany({});
	}

	//отримати топ 3 продукти
	async getTopThree() {
		return this.prismaService.products.findMany({
			take: 3,
			where: { discontinued: false },
			orderBy: { id: 'asc' },
		});
	}

	//отримати продукти за кольором
	async getByColor({ color, type }: { color: string; type: string }) {
		return this.prismaService.products.findMany({
			where: { color, type },
		});
	}

	//отримати продукти за категорією
	async getByCategory(category: string) {
		return this.prismaService.products.findMany({
			where: { category, discontinued: false },
		});
	}

	//отримати всі кольори за типом
	async getColorsByType(type: string): Promise<string[]> {
		const colors: string[] = [];
		return this.prismaService.products
			.findMany({
				where: { type: type, discontinued: false },
				select: { color: true },
				distinct: ['color'],
			})
			.then((res) => {
				res.forEach((el) => {
					colors.push(el.color);
				});
				return colors;
			});
	}

	//отримати продукт за id
	async getById(id: number) {
		return this.prismaService.products.findUnique({
			where: { id: Number(id) },
		});
	}

	//змінити дані продукта
	async edit(id: number, dto: EditProductDto) {
		return this.prismaService.products.update({
			where: { id: Number(id) },
			data: dto,
		});
	}
	async delete(id: number) {
		return this.prismaService.products.delete({
			where: { id: Number(id) },
		});
	}
}
