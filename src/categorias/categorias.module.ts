//Esse arquivo organiza tudo que pertence a categorias.
//Ele junta o controller e o service dentro de um módulo.

import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';

@Module({
  controllers: [CategoriasController], //Aqui o Nest sabe que esse módulo tem um controller para receber rotas.
  providers: [CategoriasService], //Aqui o Nest sabe que esse módulo tem um service para executar a lógica.
})
export class CategoriasModule {}
