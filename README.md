# NestJS Auth API

Este projeto demonstra a implementação de **autenticação e autorização** usando **NestJS**, **JWT**, **Passport**, **Prisma ORM** e **PostgreSQL**, com testes de API via **Insomnia**.

## 📦 Tecnologias Utilizadas

* [NestJS](https://nestjs.com/)
* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [JWT (JSON Web Token)](https://jwt.io/)
* [Passport](http://www.passportjs.org/)
* [Insomnia](https://insomnia.rest/)

---

## 🚀 Instalação

1. **Clone o projeto:**

```bash
git clone https://github.com/seu-usuario/nest-auth-api.git
cd nest-auth-api
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o arquivo `.env`:**

Altere arquivo `.env` na raiz com o conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nest_auth"
JWT_SECRET="sua_chave_secreta"
```

4. **Configure o banco de dados com Prisma:**

```bash
npx prisma migrate dev --name init
```

5. **Execute o projeto:**

```bash
npm run start:dev
```

---

## 🧪 Testando com Insomnia

Um arquivo `.json` com requisições prontas pode ser importado no Insomnia (ou Postman):

* Login
* Cadastro de usuários
* Rotas protegidas com JWT
* Controle de acesso baseado em permissões

---

## 🛡 Autenticação e Autorização

* **Autenticação** via `email` e `senha` com JWT.
* **Autorização** baseada em **roles** (papéis) e **permissions** (permissões granulares).
* Uso de **guards personalizados** para proteger rotas com base em permissões.

---



## ✅ Recursos Incluídos

* Registro e login de usuários
* Criação de papéis (`roles`) e permissões (`permissions`)
* Posts e comentários protegidos por permissões
* Guards reutilizáveis com metadados customizados
* Estratégias de autenticação via `passport-jwt` e `passport-local`

---

## 📘 Documentação

Leia o [eBook Autenticação e Autorização em NestJS](./nestAuth.pdf) incluído neste projeto para entender a implementação passo a passo, com explicações conceituais e práticas.


