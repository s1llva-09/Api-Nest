//Esse arquivo é o cérebro do CRUD.
//nele que ficam as regras para
//Criar categoria, listar categorias, buscar categorias por id, atualizar categorias e deletar categorias


// Importa Injectable e NotFoundException do NestJS.
// Injectable permite que essa classe seja usada como service.
// NotFoundException retorna erro 404 quando algo não é encontrado.
import { Injectable, NotFoundException } from '@nestjs/common';

// Importa InjectModel para injetar o model do Mongoose dentro do service.
import { InjectModel } from '@nestjs/mongoose';

// Importa Model, que representa o model do Mongoose usado para acessar o banco.
import { Model } from 'mongoose';

// Importa o DTO usado para criar categoria.
import { CreateCategoriaDto } from './dto/create-categoria.dto';

// Importa o DTO usado para atualizar categoria.
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

// Importa a classe Categoria e o tipo CategoriaDocument do schema.
import {
  Categoria,
  CategoriaDocument,
} from './entities/categoria.schema';

@Injectable()
export class CategoriasService {
  // O constructor injeta o model Categoria do Mongoose.
  // Esse model permite criar, listar, buscar, atualizar e deletar no MongoDB.
  constructor(
    @InjectModel(Categoria.name)
    private categoriaModel: Model<CategoriaDocument>,
  ) {}

  // Cria uma nova categoria no MongoDB.
  async create(createCategoriaDto: CreateCategoriaDto) {
    // Cria uma nova instância do model com os dados recebidos no body.
    const novaCategoria = new this.categoriaModel(createCategoriaDto);

    // Salva a categoria no banco de dados.
    const categoriaSalva = await novaCategoria.save();

    // Retorna uma mensagem e a categoria salva.
    return {
      mensagem: 'Categoria criada com sucesso!',
      categoria: categoriaSalva,
    };
  }

  // Lista todas as categorias salvas no MongoDB.
  async findAll() {
    return this.categoriaModel.find().exec();
  }

  // Busca uma categoria pelo id do MongoDB.
  async findOne(id: string) {
    const categoria = await this.categoriaModel.findById(id).exec();

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return categoria;
  }

  // Atualiza uma categoria pelo id.
  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoriaAtualizada = await this.categoriaModel
      .findByIdAndUpdate(id, updateCategoriaDto, {
        new: true,
      })
      .exec();

    if (!categoriaAtualizada) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return {
      mensagem: 'Categoria atualizada com sucesso!',
      categoria: categoriaAtualizada,
    };
  }

  // Remove uma categoria pelo id.
  async remove(id: string) {
    const categoriaRemovida = await this.categoriaModel
      .findByIdAndDelete(id)
      .exec();

    if (!categoriaRemovida) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return {
      mensagem: 'Categoria removida com sucesso!',
      categoria: categoriaRemovida,
    };
  }
}