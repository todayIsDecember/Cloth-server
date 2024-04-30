import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class ReviewsService {
	constructor(private readonly prismaService: PrismaService) {}
	// створити відгук
	create(dto: CreateReviewDto) {
		return this.prismaService.reviews.create({
			data: {
				name: dto.name,
				description: dto.description,
				raiting: dto.raiting,
			},
		});
	}

	// отримати всі відгуки
	getAll() {
		return this.prismaService.reviews.findMany({
			orderBy: {
				id: 'desc',
			},
		});
	}

	// видалити відгук
	delete(id: number) {
		return this.prismaService.reviews.delete({
			where: {
				id: Number(id),
			},
		});
	}

	//отримати топ 3 відгуки
	getTop() {
		return this.prismaService.reviews.findMany({
			take: 3,
			orderBy: {
				raiting: 'desc',
			},
			where: {
				raiting: 5,
			},
		});
	}
}
