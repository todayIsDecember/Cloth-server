import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreatePricesDto } from '../src/prices/dto/createPrices.dto';
import { PRICES_NOT_FOUND } from '../src/prices/prices.constants';

const testDto: CreatePricesDto = {
	price: 300,
	type: 'електрощиток',
};

const editTestDto: Pick<CreatePricesDto, 'price'> = {
	price: 1000,
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

	it('/prices/create (POST) | success', async () => {
		return request(app.getHttpServer())
			.post('/prices/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				testId = body.id;
				expect(testId).toBeDefined();
			});
	});
	it('/prices/getAll (GET) | success', async () => {
		return request(app.getHttpServer())
			.get('/prices/getAll')
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThan(0);
			});
	});
	it('/prices/edit (PATCH) | success', async () => {
		return request(app.getHttpServer())
			.patch('/prices/edit/' + testId)
			.send(editTestDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
			});
	});
	it('/prices/edit (PATCH) | fall', async () => {
		return request(app.getHttpServer())
			.patch('/prices/edit/' + 76889)
			.send(editTestDto)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PRICES_NOT_FOUND);
			});
	});
	it('/prices/delete (DELETE) | success', () => {
		return request(app.getHttpServer())
			.delete('/prices/delete/' + testId)
			.expect(200);
	});
	it('/prices/delete (DELETE) | fall', async () => {
		return request(app.getHttpServer())
			.delete('/prices/delete/' + 76889)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(PRICES_NOT_FOUND);
			});
	});
});
