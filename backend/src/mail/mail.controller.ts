import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('mail')//Agrupa las rutas bajo "email"
@Controller('mail')//Define ruta base
export class MailController {
  constructor(private readonly mailService: MailService) {}



  @Get('test') // http://localhost:4000/mail/test
  @ApiOperation({summary:'ruta de prueba para verificar que se envia el correo correctamente'})
  @ApiResponse({
    status:200,
    description: 'Correo enviado correctamente',
  })
  @ApiResponse({
    status:400,
    description: 'Hubo un error',
  })
  async testMail() {
    await this.mailService.sendMail(
      'leglisemariano@gmail.com',
      'Correo de prueba desde DinoDevs',
      '<h1>Este correo fue enviado correctamente</h1>'
    );

    return { message: 'Correo enviado exitosamente' };
  }
}