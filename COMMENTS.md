# COMMENTS.md

## Decisão da arquitetura utilizada

A arquitetura do sistema foi baseada em uma abordagem **monolítica**, onde o front-end e o back-end compartilham um único repositório, mas são desenvolvidos de forma modular. Essa escolha foi feita para simplificar o desenvolvimento e facilitar o gerenciamento do código, uma vez que o projeto possui um escopo pequeno e não há uma necessidade imediata de escalabilidade horizontal.

### Back-End

Para o back-end, eu escolhi o **Express** como framework principal, devido à sua leveza e flexibilidade, além da ampla comunidade e suporte. Utilizei uma estrutura baseada no padrão **MVC (Model-View-Controller)**, onde as responsabilidades são bem separadas, facilitando a manutenção e a escalabilidade do sistema. A escolha do **MySQL2** como banco de dados relacional foi feita com base na necessidade de um banco robusto e na familiaridade com SQL.

### Front-End

No front-end, eu adotei o **Vue.js** como framework principal devido à sua simplicidade e excelente desempenho. A gestão de estado é feita utilizando **Pinia**, uma solução moderna e recomendada pela comunidade Vue, para garantir que o gerenciamento de dados no aplicativo seja eficiente e escalável. **Vite** foi escolhido como bundler devido à sua rapidez e à excelente integração com o Vue.js, melhorando o desempenho durante o desenvolvimento.

### Integração entre Front-End e Back-End

O front-end se comunica com o back-end por meio de **APIs RESTful**, sendo as requisições HTTP feitas com o uso de **Axios**. As respostas da API são tratadas de maneira assíncrona utilizando **Promises** e **async/await**, garantindo uma comunicação eficiente e fluida entre as camadas do sistema.

### Autenticação e Autorização

Para autenticação, eu utilizei **JWT (JSON Web Token)**, garantindo que os usuários autenticados possam acessar recursos protegidos de forma segura. As senhas dos usuários são armazenadas de maneira segura utilizando a biblioteca **bcrypt** para criptografia.

### Testes e Qualidade do Código

A arquitetura foi projetada com foco na testabilidade. Eu utilizei **Vitest** para testes unitários e de integração, e **@vue/test-utils** para testar componentes Vue. A qualidade do código também é garantida com ferramentas como **ESLint** e **Prettier**, que ajudam a manter o código limpo e organizado.

### Escalabilidade e Manutenção

Embora o sistema não seja projetado para escalar horizontalmente no momento, a modularização do código permite que o sistema seja facilmente expandido e mantido conforme novas funcionalidades forem adicionadas. A separação clara entre as camadas de back-end e front-end também contribui para a facilidade de manutenção e evolução do projeto.

---

## Lista de Bibliotecas de Terceiros Utilizadas

### Dependências de Desenvolvimento (Geral)

- **[ESLint](https://eslint.org/)**: Para garantir a qualidade do código, a adoção de boas práticas e a prevenção de erros bobos.
- **[Prettier](https://prettier.io/)**: Para formatação/embelezamento de código.
- **[cpf-cnpj-validator](https://www.npmjs.com/package/cpf-cnpj-validator)**: Utilidades para validação de CPF.

### Back-End

- **[Express](https://expressjs.com/)**: Framework robusta e de alto desempenho para o desenvolvimento de APIs com Node.js.
- **[mysql2](https://www.npmjs.com/package/mysql2)**: Para interagir com bancos de dados MySQL, oferecendo suporte nativo a Promises (async/await).
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Biblioteca para carregar variáveis de ambiente definidas no arquivo `.env`.
- **[joi](https://joi.dev/)**: Escolhi essa biblioteca pela habilidade de definir schemas para validação e personalizar mensagens de erro. Ela trouxe vários benefícios, como visualização da estrutura dos dados, melhor tratamento de erro e, claro, economia de tempo, já que não é necessário escrever a lógica das regras de negócio manualmente.

#### Autenticação e Autorização

- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Biblioteca para criação e verificação de tokens JWT (JSON Web Token), usada para autenticar usuários e garantir que eles possuam as permissões necessárias para acessar recursos protegidos da API.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Biblioteca para hash de senhas, permitindo que os dados sensíveis dos usuários sejam armazenados de forma segura, utilizando um algoritmo de criptografia eficiente e resistente a ataques de força bruta.

### Front-End

- **[Vite](https://vitejs.dev/)**: Escolhi pela velocidade de transpilação e uso nativo de "ES Modules". Ela também é a ferramenta de build oficialmente recomendada pela equipe do Vue 3.
- **[Axios](https://axios-http.com/)**: Cliente HTTP. Escolhi o Axios por sua facilidade de uso e recursos avançados, como a capacidade de configurar cabeçalhos em requisições de forma simples.
- **[Pinia](https://pinia.vuejs.org/)**: Gerenciamento de estado, recomendado oficialmente pela equipe do Vue 3.
- **[Vue Router](https://router.vuejs.org/)**: Para criar páginas e layouts separados para login e dashboard.

### Testes

- **[@vue/test-utils](https://vue-test-utils.vuejs.org/)**: Utilizado para testes unitários em componentes Vue.
- **[jsdom](https://www.npmjs.com/package/jsdom)**: Implementação de um ambiente DOM para testar código JavaScript em Node.js.
- **[Vitest](https://vitest.dev/)**: Framework de testes rápido e leve, otimizado para Vue.
- **[@pinia/testing](https://github.com/posva/pinia/tree/main/packages/testing)**: Ferramenta para testes de Pinia, garantindo a integridade do gerenciamento de estado.

### Otimização (Vuetify)

- **[vite-plugin-vuetify](https://github.com/vuetifyjs/vite-plugin-vuetify)**: Plugin para integração do Vuetify com Vite.
- **[@mdi/font](https://www.npmjs.com/package/@mdi/font)**: Conjunto de ícones do Material Design para Vue.
- **[unplugin-fonts](https://github.com/antfu/unplugin-fonts)**: Utilizado para otimização de fontes no Vite.
- **[Sass](https://sass-lang.com/)**: Pré-processador CSS para facilitar a personalização e manutenção de estilos no Vuetify.

---

## O que você melhoraria se tivesse mais tempo?

1. **Testes unitários no back-end**
2. **Refatoração do back-end com Sequelize**
3. **Uma página de registro de usuário (admin, visitante, etc.)**
4. **Acessibilidade e responsividade da interface**

## Quais requisitos obrigatórios que não foram entregues?

[Nenhum.]
