import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const testDto = {
	name: 'Роман Тимків',
	description: 'test',
	raiting: 5,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let testId: number;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/reviews/create (POST) | success', async () => {
		return request(app.getHttpServer())
			.post('/reviews/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				testId = body.id;

				expect(testId).toBeDefined();
			});
	});
	it('/reviews/delete (DELETE) | success', () => {
		return request(app.getHttpServer())
			.delete('/reviews/delete/' + testId)
			.expect(200);
	});
});
