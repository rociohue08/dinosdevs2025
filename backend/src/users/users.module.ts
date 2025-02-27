import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController], // Asegúrate de que el controlador esté aquí
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
