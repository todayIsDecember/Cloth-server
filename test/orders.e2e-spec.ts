import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const testDto = {
	customer_name: 'Роман Тимків',
	phone: '0665865204',
	usedelivery: true,
	city: 'київ',
	department: '116',
	products: [
		{
			id: 1,
			height: 2.9,
			width: 1.7,
			isfinished: true,
			price: 1350,
		},
	],
	price: 2900,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let testId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/orders/create (POST) | success', async () => {
		return request(app.getHttpServer())
			.post('/orders/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				testId = body.id;
				expect(testId).toBeDefined();
			});
	});
});
