<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456


# Passo a Passo para Rodar a Aplicação NestJS

## Pré-requisitos

1. **Node.js** e **npm** instalados.
2. **Docker** e **Docker Hub** instalados e configurados.

## Instruções

### 1. Clonar o repositório

```bash
git clone https://github.com/SC-Cynex/cynex-time-services.git
```
```bash
cd cynex-time-services
```

### 2. Instalar CLI do NestJS
```bash
npm install -g @nestjs/cli
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Subir contêineres Docker
```bash
docker-compose up -d
```

### 5. Rodar as migrações do banco de dados
```bash
npx prisma migrate dev
```

### 6. Iniciar a aplicação
```bash
npm run start
```

## Desenvolvedores

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/humberto-peres"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/118866895?s=400&u=a12412e21705d58ab604be67c1e1431c80174b64&v=4" width="100px;" alt=""/><br /><sub><b>Humberto Peresd</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">👨‍🚀</a></td>
    <td align="center"><a href="https://github.com/WesllyHn"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/117309594?v=4" width="100px;" alt=""/><br /><sub><b>Weslly Neres</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">👨‍🚀</a></td>
    <td align="center"><a href="https://github.com/Pellegr1n1"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/119978954?v=4" width="100px;" alt=""/><br /><sub><b>Leandro Pellegrini</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">👨‍🚀</a></td>
    <td align="center"><a href="https://github.com/v0cs"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/104214178?v=4" width="100px;" alt=""/><br /><sub><b>Vítor Celestino</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://github.com/icl00ud"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98751190?v=4" width="100px;" alt=""/><br /><sub><b>Israel Moreira</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
  </tr>
