// Tudo o que fica no front-end(eh executado no browser) esta exposto para qualquer um, ou seja, acoes mais confidenciais, por
// exemplo operacoes no banco de dados, envio de emails, autenticacao, pagamentos, conexoes com servicos externos devem ser feitos
// no back-end

// SSR, SSG e API roots rodam no servidor node, ou seja, as variaveis ambiente ficam disponiveis nesses contextos

// Em alguns casos podemos utilizar somente o Next(API roots) ao inves de construir um back-end, pois o next executa um servidor node

import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, nome: 'Vitor' },
    { id: 2, nome: 'Joao' },
    { id: 3, nome: 'Luiz' }
  ];

  return response.json(users);
}

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