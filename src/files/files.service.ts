import { Injectable } from '@nestjs/common';
import { mFile } from './mFile.class';
import { path } from 'app-root-path';
import { ensureDir, writeFile, pathExists, remove } from 'fs-extra';
import { fileElementResponse } from './dto/file-element.response';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
	async saveFiles(files: mFile[]) {
		const uploadFolder = `${path}/images`;
		await ensureDir(uploadFolder);

		const res: fileElementResponse[] = [];

		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({ url: `${file.originalname}`, name: file.originalname });
		}

		return res;
	}

	async convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}

	async findFIle(fileName: string): Promise<boolean> {
		const uploadedFile = `${path}/images/${fileName}`;
		return new Promise((resolve, reject) => {
			pathExists(uploadedFile, (err, exists) => {
				if (err) {
					reject(err); // обробляти помилки, якщо такі є
					return;
				}
				resolve(exists);
			});
		});
	}

	async deleteFile(fileName: string) {
		const uploadedFile = `${path}/images/${fileName}`;
		await remove(uploadedFile);
	}
}
