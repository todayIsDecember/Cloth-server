import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Get('register')
	async register() {
		return this.authService.register();
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: { number: number }) {
		return this.authService.login(dto);
	}
}
