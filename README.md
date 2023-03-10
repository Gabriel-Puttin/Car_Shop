# Boas vindas ao Projeto Car Shop !

Aqui você vai encontrar os detalhes de como foi minha experiência durante o desenvolvimento deste projeto, stacks utilizadas e uma breve documentação sobre como utilizar este projeto em pleno funcionamento.

# Sobre o projeto

Este projeto teve como objetivo a construção de uma API com CRUD para gerenciar uma concessionária de veículos utilizando os principios da Programação Orientada a Objetos (POO). Neste projeto foi feito utilizando o banco de dados MongoDB através do framework do Mongoose, utilizando uma arquitetura de software do tipo DDD (domain driven design) junto com o tipo MSC (model, service, controller), além de testes unitários utilizando as libes Chai, Mocha e Sinon para cobrir toda a camada Service do código backend desenvolvido em TypeScript. Também neste projeto foi utilizado o ESlint para deixar o código mais coeso e de fácil manutenção/alteração.

# Stacks utilizadas

* TypeScript
* Node.js
* Chai
* Mocha
* Sinon
* Express.js
* MongoDB
* Mongoose
* Docker

# Documentação

Para a execução deste propjeto é necessário ter o Docker e o Docker-Compose instalados na sua máquina. Portanto confira a documentação oficial para a instalação.

## Instalando Dependências

> Docker

[Link](https://docs.docker.com/engine/install/) para a documentação oficial

> Docker-Compose

[Link](https://docs.docker.com/compose/install/#install-compose) para a documentação oficial

## Executando aplicação

1. Clone o repositório (caso esteja usando chave SSH)
```
git clone git@github.com:Gabriel-Puttin/Car_Shop.git
```
2. Entre na pasta que você acabou de clonar
```
cd Car_Shop
```
3. Suba a aplicação com o docker-compose
```
docker-compose up -d
```
4. Acesse o terminal do container backend criado
```
docker exec -it car_shop bash
```
5. Instale as dependências
```
npm install
```
6. Rode a aplicação
```
npm run dev
```
