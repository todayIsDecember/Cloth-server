import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePricesDto } from './dto/createPrices.dto';

@Injectable()
export class PricesService {
	constructor(private readonly prismaService: PrismaService) {}

	// стоврити ціну
	async create(dto: CreatePricesDto) {
		return this.prismaService.prices.create({ data: dto });
	}

	// отримати всі ціни
	async getAll() {
		return this.prismaService.prices.findMany();
	}

	// отримати ціну за id
	async getById(id: number) {
		return this.prismaService.prices.findUnique({ where: { id: Number(id) } });
	}

	// змінити ціну
	async edit(id: number, dto: Pick<CreatePricesDto, 'price'>) {
		return this.prismaService.prices.update({
			where: { id: Number(id) },
			data: dto,
		});
	}

	// видалити ціну
	async delete(id: number) {
		return this.prismaService.prices.delete({ where: { id: Number(id) } });
	}
}
