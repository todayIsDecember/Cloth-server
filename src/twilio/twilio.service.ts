import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
	private twilioClient: Twilio;
	private accountSid: string = this.configService.get('TWILIO_SID');
	private authToken: string = this.configService.get('TWILIO_TOKEN');
	private twilioNumber: string = this.configService.get('TWILIO_NUMBER');
	constructor(private readonly configService: ConfigService) {
		this.twilioClient = new Twilio(this.accountSid, this.authToken);
	}

	async sendSMS(to: string, body: string) {
		try {
			await this.twilioClient.messages.create({
				body: body,
				from: this.twilioNumber,
				to: to,
			});
			console.log('SMS sent successfully');
		} catch (error) {
			console.error('Error sending SMS:', error);
		}
	}
}
