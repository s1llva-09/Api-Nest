 //Esse arquivo define quais dados o usuário pode enviar para atualizar uma categoria.

//Ele usa como base o CreateCategoriaDto.

import { PartialType } from '@nestjs/mapped-types'; //Importa uma ferramenta do NestJS que transforma os campos em opcionais.
import { CreateCategoriaDto } from './create-categoria.dto'; //Importa o DTO de criação para reaproveitar os campos dele.

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {//Crie um DTO de atualização baseado no DTO de criação, mas deixando tudo opcional.

}
