import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateProductDto } from 'src/products/dto/createProductDto';
import { EditProductDto } from 'src/products/dto/editProductDto';

const testDto: CreateProductDto = {
	name: 'test',
	description:
		"Шторний матеріал Мікровелюр , гарно підходять до будь-якого інтер'єру , легкий та ніжний матеріал . виробництво Туреччина . Висота штор в рулоні до 2,90 м ширина корегується . Шиємо під індивідуальні розміри.",
	photo: '1.webp',
	category: 'штори',
	width: 1,
	height: 2.9,
	type: 'мікровелюр',
	color: 'Графітовий',
};

const editTestDto: EditProductDto = {
	name: 'editedTest',
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

	it('/products/create (POST) | success', async () => {
		return request(app.getHttpServer())
			.post('/products/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				testId = body.id;
				expect(testId).toBeDefined();
			});
	});
	it('/products/all (GET) | success', async () => {
		return request(app.getHttpServer())
			.get('/products/all')
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThan(0);
			});
	});
	it('/products/edit (PATCH) | success', async () => {
		return request(app.getHttpServer())
			.patch('/products/edit/' + testId)
			.send(editTestDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
			});
	});
	it('/products/edit (PATCH) | fall', async () => {
		return request(app.getHttpServer())
			.patch('/products/edit/' + 76889)
			.send(editTestDto)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe('такого продукту не існує');
			});
	});
	it('/products/delete (DELETE) | success', () => {
		return request(app.getHttpServer())
			.delete('/products/delete/' + testId)
			.expect(200);
	});
	it('/products/delete (DELETE) | fall', async () => {
		return request(app.getHttpServer())
			.delete('/products/delete/' + 76889)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe('такого продукту не існує');
			});
	});
});
