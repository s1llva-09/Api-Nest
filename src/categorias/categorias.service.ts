//Esse arquivo é o cérebro do CRUD.
//nele que ficam as regras para
//Criar categoria, listar categorias, buscar categorias por id, atualizar categorias e deletar categorias


// Importa o Injectable para informar ao NestJS que essa classe pode ser injetada em outros lugares.
// Importa o NotFoundException para retornar erro 404 quando uma categoria não for encontrada.
import { Injectable, NotFoundException } from '@nestjs/common';

// Importa o DTO usado quando uma nova categoria for criada.
import { CreateCategoriaDto } from './dto/create-categoria.dto';

// Importa o DTO usado quando uma categoria for atualizada.
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

// Importa a entidade Categoria, que representa o formato completo de uma categoria.
import { Categoria } from './entities/categoria.entity';


//o decorator @Injectable() diz para o NestJS que essa classe é um serviço
//Um service é onde colocamos a logica da aplicação
@Injectable()
export class CategoriasService {
  //aqui criamos uma lista vazia de categorias
  //essa lista vai funcionar como um "banco de dados temporario"
  //enquanto o servidor estiver ligado, os dados ficam salvos aqui
  //se parar o servidor, os dados somem
  private categorias: Categoria[] = [];

  //Método responsável por criar uma nova categoria
  //Ele recebe os dados enviados pelo usuário através do CreateCategoriaDto
  create(createCategoriaDto: CreateCategoriaDto) {
    //criamos uma nova categoria com o formato de entidade Categoria
    const novaCategoria: Categoria = {
      //Date.now() gera um número baseado na data/hora atual
      //toString() transforma esse número em texto
      //Isso será usado como id temporário da categoria
      id: Date.now().toString(),

      //o nome vem do corpo da requisição
      //Exemplo: { "nome": "Eletronico "}
      nome: createCategoriaDto.nome,

      // O ativo também vem do corpo da requisição
      // Exempl: { "ativo": true }
      ativo: createCategoriaDto.ativo
    };

    //Adiciona a nova categoria dentro da lista de categorias
    this.categorias.push(novaCategoria)

    // Retornas uma reposta para quem chamou a API
    return {
      mensagem: 'Categoria criada com sucesso',
      categoria: novaCategoria,
    }
  }

  //Metodo responsavel por listar todas as categorias cadastradas
  findAll() {
    //retornar a lista completa de categorias
    return this.categorias
  }

  //Método responsavel por buscar uma categoria especifica pelo id
  findOne(id: string) {
    //Procura dentro da lista uma categoria cujo id seja igual ao id recebido
    const categoria = this.categorias.find((item) => item.id === id)

    // Se não encontrar nenhuma categoria, retorna um erro 404
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada')
    }

    //se encontrar, retorna a categoria encontrada
    return categoria;
  }

  //Metodo responsavel por atualizar uma categoria existente
  //Recebe o id da categoria e novos dados enviados pelo usuario
  update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    //Primeiro tenta encontrar a categoria pelo id
    //Se não encontrar, o próprio findOne já lança erro 404
    const categoria = this.findOne(id)

    //Object.assign copia os dados novos para dentro da categoria encontrada
    //se o usuario mandar so o nome, atualiza so o nome
    //se mnadar so o ativo, atualiza so o ativo
    Object.assign(categoria, UpdateCategoriaDto)

    //Retorna unma resposta dizendo que atualizou com sucesso
    return {
      mensagem: 'Categoria atualizada com sucesso!',
      categoria,
    }
  }

  //Metodo resposnavel por remover uma categoria
  remove(id: string) {
    //primeiro verifica se a categoria existe
    //se nao existir, o findOnde lanã erro 404

    const categoria = this.findOne(id)

    //Cria uma nova lista removendo a categoria que tem o id informado
    //o filter mentem apenas os itens cujo id seja diferente do id recebido
    this.categorias = this.categorias.filter((item) => item.id !== id)

    //retorna uma resposta dizendo que removeu com sucesso
    return {
      mensagem: 'Categoria removida com sucesso',
      categoria,
    }
  }
}