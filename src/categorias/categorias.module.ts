// Importa Module para criar o módulo.
import { Module } from '@nestjs/common';

// Importa MongooseModule para registrar o schema da categoria neste módulo.
import { MongooseModule } from '@nestjs/mongoose';

// Importa o controller de categorias.
import { CategoriasController } from './categorias.controller';

// Importa o service de categorias.
import { CategoriasService } from './categorias.service';

// Importa a classe Categoria e o schema CategoriaSchema.
import { Categoria, CategoriaSchema } from './entities/categoria.schema';

@Module({
  imports: [
    // Registra o schema Categoria dentro do módulo.
    // Isso permite usar @InjectModel(Categoria.name) no service.
    MongooseModule.forFeature([
      {
        name: Categoria.name,
        schema: CategoriaSchema,
      },
    ]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}