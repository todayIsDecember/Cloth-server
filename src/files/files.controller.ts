import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileElementResponse } from './dto/file-element.response';
import { mFile } from './mFile.class';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@HttpCode(200)
	@Post('uploadFile')
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<fileElementResponse[]> {
		const saveArray: mFile[] = [];
		if (file.mimetype.includes('image')) {
			const originalFileName = `${file.originalname.split('.')[0]}.webp`;
			const existFile = await this.filesService.findFIle(originalFileName);
			if (existFile) {
				throw new HttpException('File with that name already exists', HttpStatus.CONFLICT);
			}
			const buffer = await this.filesService.convertToWebp(file.buffer);
			saveArray.push(
				new mFile({
					originalname: originalFileName,
					buffer,
				}),
			);
		}
		return this.filesService.saveFiles(saveArray);
	}

	@HttpCode(200)
	@Post('deleteFile')
	async deleteFIle(@Body('fileName') fileName: string) {
		const deleteFile = await this.filesService.findFIle(fileName);
		if (!deleteFile) {
			throw new HttpException('файл не знайдено', HttpStatus.NOT_FOUND);
		}
		return this.filesService.deleteFile(fileName);
	}
}
