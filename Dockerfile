# Estágio de construção
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --save @nestjs/core @nestjs/common @nestjs/platform-express
RUN npm install

COPY . .

RUN npm run build


# Estágio de produção
FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
