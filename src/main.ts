// Importa o módulo de DNS nativo do Node.js.
// Ele será usado para forçar o Node a consultar servidores DNS públicos.
import * as dns from 'node:dns';

// Força o Node.js a usar DNS públicos.
// Isso ajuda quando o MongoDB Atlas dá erro querySrv ECONNREFUSED.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Importa o NestFactory, responsável por iniciar a aplicação NestJS.
import { NestFactory } from '@nestjs/core';

// Importa o AppModule, que é o módulo principal da aplicação.
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria a aplicação NestJS usando o AppModule.
  const app = await NestFactory.create(AppModule);

  // Inicia o servidor na porta 3000.
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();