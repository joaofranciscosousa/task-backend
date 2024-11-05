# Tasks Back End

<!-- <img src="./public/img/logo.png" alt="Exemplo imagem" width="500"> -->

Esse projeto é a API do aplicativo Tasks. Esse app tem como objetivo a demonstação de uma aplicação full-stack com React Native e Express. é uma aplicação simples e com diversas funcionalidades.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!-- Aqui deve ser listado versão do NodeJS, banco de dados, etc. -->

- Você instalou a versão LTS do [`Node`](https://nodejs.org/pt).
- Você instalou e configurou o banco de dados [`MY SQL`](https://www.mysql.com/downloads/). Como forma alternativa, você pode instalar via [`Docker`](https://hub.docker.com/_/mysql).
- Você possui o gerenciador de pacotes (Opicional) [`Yarn`](https://classic.yarnpkg.com/lang/en/docs/install)
- Você tem uma máquina `Windows`, `Mac` ou `Linux`.

## 🚀 Instalando dependências do Tasks back-end

Para instalar as dependências do projeto, execute os seguintes comandos:

```
npm install
# or
yarn install
```

Instale também todas os arquivos de fontes localizados em `public/fonts`.

### Configuração do banco de dados e variáveis de ambiente

<!-- Essa seção só deve ser inclusa se necessário -->

Para configurar o banco de dados e popula-lo com os dados necessários para o funcionamento do projeto, execute as seguintes ações:

1. Crie um cópia do arquivo `.env.example` chamado `.env`. Nele serão inseridas as variáveis de ambiente utilizadas no projeto.
2. Após criado esse arquivo, preencha-o com as suas credências de acesso ao banco de dados e todas as demais variáveis.
3. Execute o seguinte comando para executar as migrations: `yarn typeorm migration:run` ou `npm run typeorm migration:run`
4. Se necessário reverter uma migration, utilize o seguinte comando: `yarn typeorm migration:revert` ou `npm run typeorm migration:revert`

## ☕ Usando o Tasks back-end

### Em modo desenvolvimento

```bash
npm run dev
# or
yarn dev
```

### Em modo produção

```bash
npm run build
# or
yarn build
```

Logo em seguida:

```bash
npm start
# or
yarn start
```

Após iniciar o projeto, verifique se ele está disponível na URL `http://localhost:3000`.

## 📫 Contribuindo para o Tasks back-end

Para contribuir com o back-end, siga estas etapas:

1. Clone este repositório.
2. Crie uma branch: `git checkout -b <numero_da_tarefa>`.
3. Faça suas alterações e confirme-as: `git commit -m '<tipo_do_commit>: [<numero_da_tarefa>] <mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.
