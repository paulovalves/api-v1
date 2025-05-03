[//]: # (<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>)

[//]: # (<p align="center">)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>)

[//]: # (<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>)

[//]: # (<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>)

[//]: # (<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>)

[//]: # (<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>)

[//]: # (  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>)

[//]: # (    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>)

[//]: # (  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>)

[//]: # (</p>)

[//]: # (  <!--[![Backers on Open Collective]&#40;https://opencollective.com/nest/backers/badge.svg&#41;]&#40;https://opencollective.com/nest#backer&#41;)

[//]: # (  [![Sponsors on Open Collective]&#40;https://opencollective.com/nest/sponsors/badge.svg&#41;]&#40;https://opencollective.com/nest#sponsor&#41;-->)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup
Este projeto é uma aplicação NestJS que utiliza o banco de dados PostgreSQL e o TypeORM. O projeto é estruturado para facilitar a criação de APIs RESTful e inclui suporte para autenticação JWT, validação de dados com class-validator e documentação da API com Swagger.

## Pré-requisitos
- Node.js (v20 ou superior)
- npm (v11.3 ou superior)
- PostgreSQL (v14 ou superior)
- Liquibase (para gerenciamento de migrações de banco de dados)
- Docker (opcional, para executar o PostgreSQL em um contêiner)
- Nest CLI (opcional, para facilitar o desenvolvimento)

## Instalação
Para instalar o projeto, siga os passos abaixo:

### Docker
Para executar o projeto via Docker, você pode usar o seguinte comando:

```bash
chmod +x ./start-docker.sh && ./start-docker.sh
```

Isso iniciará um contêiner Docker com o PostgreSQL em execução e criará as tabelas no banco de dados.

### Local
Para executar o projeto localmente, você precisará de um banco de dados PostgreSQL em execução. Você pode usar o Docker para criar um contêiner PostgreSQL ou instalar o PostgreSQL localmente.
 
Certifique-se de ter o Node.js e o npm instalados em sua máquina.

Clone o repositório e navegue até o diretório do projeto.

Instale as dependências do projeto usando o npm.
```bash
npm install
npm install --save @nestjs/config @nestjs/typeorm typeorm pg dotenv @nestjs/swagger sequelize sequelize-typescript hbs @nestjs/plateform-express 
```
$ npm install --save-dev @types/sequelize
```

## Configure o banco de dados
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
TEST_NODE_ENV=development
DEFAULT_PORT=8080
POSTGRES_LOCALHOST_HOST=127.0.0.1
POSTGRES_LOCALHOST_PORT=5432
POSTGRES_LOCALHOST_USER=usuario
POSTGRES_LOCALHOST_PASSWORD=senha
POSTGRES_LOCALHOST_DATABASE=database
POSTGRES_LOCALHOST_SYNC=false
POSTGRES_LOCALHOST_LOGGING=true
MIGRATIONS_LOCALHOST_PATH=src/database/migrations
CHANGELOG_LOCALHOST_PATH=src/database/liquibase/changelog/db.changelog.main.yaml
ROOT_LOCALHOST_PATH=src
API_URL=api.app.local
CLIENT_URL=client.app.local
```
Certifique-se de substituir `senha`, `usuario` e `databasse` pelos valores corretos.

## Migrations
Para criar as tabelas no banco de dados, usando migrations, será necessário ter instalada a ferramenta Liquibase.
Para instalar o Liquibase, você pode usar o seguinte comando:

```bash
sudo apt install liquibase
```
Para criar as tabelas no banco de dados, execute o seguinte comando:

```bash
liquibase --changeLogFile=src/database/changelog/db.changelog-main.yaml update
```


## Compile e execute o projeto

```bash
# Desenvolvimento
npm run start

# Recarregar automaticamente
npm run start:dev
```

## Run tests

```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
npm install -g @nestjs/mau
mau deploy
```
## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support
## Stay in touch
## License
