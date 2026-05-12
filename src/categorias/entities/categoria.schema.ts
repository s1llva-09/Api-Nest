// Importa Prop, Schema e SchemaFactory para criar um schema do MongoDB com Mongoose.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Importa HydratedDocument, que representa um documento do MongoDB já hidratado pelo Mongoose.
import { HydratedDocument } from 'mongoose';

//cria um tipo para representar o documento categoria dentro do MongoDB
export type CategoriaDocument = HydratedDocument<Categoria>;

// O decorator @Schema() informa que essa classe será transformada em um schema do MongoDB.
@Schema()
export class Categoria {
  // Campo nome.
  // required: true significa que esse campo é obrigatório.
  @Prop({ required: true })
  nome!: string;

  // Campo ativo.
  // required: true significa obrigatório.
  // default: true significa que, se não enviar ativo, ele será true automaticamente.
  @Prop({ required: true, default: true })
  ativo!: boolean;
}

// Cria o schema real do Mongoose baseado na classe Categoria.
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);