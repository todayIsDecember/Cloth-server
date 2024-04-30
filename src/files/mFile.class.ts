export class mFile {
	originalname: string;
	buffer: Buffer;

	constructor(file: Express.Multer.File | mFile) {
		this.originalname = file.originalname;
		this.buffer = file.buffer;
	}
}
