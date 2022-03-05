// Cada rota da API roots roda de forma serverless, ou seja, nao existe um servidor rodando 24/7
// Com as API roots do next podemos criar aplicacoes que nao precisam ter um back end
// Rodamos funcoes do back end no next quando elas estao muito atreladas ao front end

// Somente o SSR, SSG e as API roots sao executadas no servidor node do next, ou seja, operacoes mais confidenciais: envio de email,
// operacao no banco de dados, autenticacao de usuario, operacoes que utilizam secret keys, devem ser feitas de uma dessas tres
// formas. Elas nao podem ser feitas no client side(front end, browser), pois tudo que eh executado no front end pode ser visto pelos
// outros

// Formas de autenticacao:
// - JWT (Storage):
//  - Melhor forma para aplicacoes que nao sao de grande porte
//  - Precisamos de um back end
// - Next Auth:
//  - Login social, ou seja, atraves de terceiros(google, twitter, github)
//  - Independe de termos um back end
//  - Nao queremos armazenar as credenciais do usuario no back end
// - Servicos externos(Cognito, Auth0)

// Criar rotas dinamicas:
// - criar uma pasta com o nome da rota, exemplo users
// - criar o index.ts, que sera acessado quando acessarem /users
// - criar [parametro].ts, que sera acessado quando procurarem em /users/qualquer_coisa e parametro recebera qualquer_coisa, parametro
// pode ser acessado atraves de request.query
// - criar [...parametros].ts que sera acessado quando procurarem em /users/qualquer_coisa/... e parametros funcionara igual o rest
// operator no JS, ou seja, parametros = ['qualquer_coisa', '...'], parametros pode ser acessado por request.query

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // scope define o escopo da oauth
      authorization: { params: { scope: 'read:user' } }
    })
  ]
})

