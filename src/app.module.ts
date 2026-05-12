// Importa o Module, usado para declarar modulos no NestJS
import { Module } from '@nestjs/common';

//Importa o ConfigModule, usado para ler variaveis do arquivo .env
import { ConfigModule } from '@nestjs/config';

//Importa o MongooseModule, usado para conectar o NestJS ao mongoDB
import { MongooseModule } from '@nestjs/mongoose';

// Importa o modulo de categorias
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    //Permiote que o projueto inteiro leia as variaveis do arquivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //conecta a aplicação ao mongoDB usado a URL salva no .env
    MongooseModule.forRoot(process.env.MONGODB_URI as string),

    //importa o modulo de categorias para a aplicação principal
    CategoriasModule,
  ],
})

export class AppModule {}