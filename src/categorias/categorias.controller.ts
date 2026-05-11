//Esse arquivo é a porta de entrada da API.
//ele recebe as requisições HTTP
//Por exemplo: Post, Get, Get(id), Patch, Delete
//O controller não deve ter muita regra de negócio. Ele só recebe a requisição e chama o service.

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common' // Importa os decorators do NestJS usados para criar rotas HTTP.from '@nestjs/common';
import { CategoriasService } from './categorias.service'; // Importa o service, que contém a lógica do CRUD.
import { CreateCategoriaDto } from './dto/create-categoria.dto'; // Importa o DTO usado para criar categoria.
import { UpdateCategoriaDto } from './dto/update-categoria.dto'; // Importa o DTO usado para atualizar categoria.

//Define que todas as rotas deste controller comeãm com /categorias
//exemplo: http://localhost:3000/categorias
@Controller('categorias')
export class CategoriasController {
  //O constructor injeta o CategoriasService dentro do controller
  //Assim o controller consegue chamar os métodos do service
  constructor(private readonly categoriasService: CategoriasService) {}

//Rota para criar nova categoria
//Metodo HTTP: Post
//URL: /categorias
  @Post() //Quando alguém mandar um POST para /categorias, pegue o corpo da requisição e envie para o service criar.
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    //Pega os dados enviados no corpo da requisição e manda para o service criar
    return this.categoriasService.create(createCategoriaDto);
  }

  //rota para listar todas as categorias
  //metodo HTTP: GET
  //URL: /categorias
  @Get()
  findAll() {
    // Chama o service para retornar todas as categorias cadastradas.
    return this.categoriasService.findAll();
  }

  // Rota para buscar uma categoria específica pelo id.
  // Método HTTP: GET
  // URL: /categorias/:id
  // Exemplo: /categorias/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(id);
  }

  // Rota para atualizar uma categoria.
  // Método HTTP: PATCH
  // URL: /categorias/:id
  @Patch(':id')
  update
  (@Param('id') id: string,
  @Body() updateCategoriaDto: UpdateCategoriaDto, 
) {
    // Pega o id da URL e os dados do corpo da requisição.
    // Depois manda tudo para o service atualizar.
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  // Rota para deletar uma categoria.
  // Método HTTP: DELETE
  // URL: /categorias/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    // Pega o id da URL e manda para o service remover.
    return this.categoriasService.remove(id);
  }
}
