import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { ProductDto } from './dto/productDto';

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}
	// стоврити замовлення
	async createOrder(dto: CreateOrderDto) {
		return this.prismaService.orders.create({
			data: {
				customer_name: dto.customer_name,
				phone: dto.phone,
				usedelivery: dto.usedelivery,
				city: dto.city,
				department: dto.department,
				comment: dto.comment,
				created_at: format(new Date(), 'dd MMMM yyyy', {
					locale: uk,
				}),
				price: dto.price,
			},
			include: {
				order_details: true,
			},
		});
	}

	// добавити в order_details дані
	async createOrderDetails(order_id: number, product: ProductDto) {
		return this.prismaService.order_details.create({
			data: {
				product_id: product.id,
				order_id: order_id,
				height: product.height,
				width: product.width,
				isfinished: product.isfinished,
				price: product.price,
			},
			include: {
				products: {
					select: {
						color: true,
						name: true,
						photo: true,
					},
				},
			},
		});
	}

	// отримати всі замовлення
	async getAllOrders() {
		return this.prismaService.orders.findMany({
			include: {
				order_details: {
					include: {
						products: true,
					},
				},
			},
		});
	}
}
