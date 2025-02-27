import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'; // Importa el módulo de configuración
import { AuthModule } from '../src/auth/auth.module'; // Importa el módulo de autenticación
import { UsersModule } from '../src/users/users.module'; 
/* import { DinosaursModule } from '../src/dinosaurs/dinosaurs.module';
import { RankingsModule } from './rankings/rankings.module';
import { JuegosModule } from './juegos/juegos.module'; */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    PrismaModule, 
    AuthModule, 
    UsersModule,
   /*  DinosaursModule,
    RankingsModule,
    JuegosModule, */
  ],
})
export class AppModule {}


/* 
¿Por qué es importante ConfigModule.forRoot()?
ConfigModule.forRoot() es necesario para cargar 
las variables de entorno desde tu archivo .env. Al
 pasar la opción { isGlobal: true }, las variables de 
 entorno estarán disponibles globalmente en toda la 
 aplicación,
 no solo en el módulo donde las defines. */ 