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
