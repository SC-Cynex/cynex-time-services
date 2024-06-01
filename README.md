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
