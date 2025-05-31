import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from '../mail/mail.service';
/* Importación de JwtModule: Es necesario importar JwtModule para poder generar y verificar tokens JWT.
 */import { JwtModule } from '@nestjs/jwt';
/*  importacion de ConfigService para usarlo y acceder a las variables de entorno.
 */ import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigService

 @Module({
  imports: [
    ConfigModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController], // Controlador de autenticación
  providers: [AuthService,MailService],
  exports:[AuthService,MailService]
})
export class AuthModule {}


/* 
ConfigModule debe estar importado en el módulo principal de la aplicación 
para que las variables del .env sean accesibles globalmente.*/