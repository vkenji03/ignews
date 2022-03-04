// Tudo o que fica no front-end(eh executado no browser) esta exposto para qualquer um, ou seja, acoes mais confidenciais, por
// exemplo operacoes no banco de dados, envio de emails, autenticacao, pagamentos, conexoes com servicos externos devem ser feitos
// no back-end

// SSR, SSG e API roots rodam no servidor node, ou seja, as variaveis ambiente ficam disponiveis nesses contextos

// Em alguns casos podemos utilizar somente o Next ao inves de construir um back-end, pois o next executa um servidor node

import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, nome: 'Vitor' },
    { id: 2, nome: 'Joao' },
    { id: 3, nome: 'Luiz' }
  ];

  return response.json(users);
}