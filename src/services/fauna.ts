// Usaremos um db para sabermos quais usuarios estao inscritos(nao usaremos o id do github, pois isso deixaria a aplicacao muito
// atrelada ao github) e para armazenarmos as informacoes relacionadas as inscricoes de cada usuario, pois dessa forma nao precisaremos
// realizar requisicoes para a API do stripe, ou seja, temos um acesso mais facil e performatico desses dados

// Escolha do db(para ambientes serverless o ideal sao db que nao precisam manter uma conexao aberta/constante entre o db e a
// aplicacao):
// - FaunaDB(ideal para aplicacoes serverless):
//  - A conexao do db com a aplicacao eh realizada por protocolos parecidos com o HTTP, ou seja, cada operacao no banco abre uma nova
//  conexao entre os dois e apos sua realizacao a conexao eh fechada, que eh justamente a forma como um ambiente serverless funciona
// - PostgreSQL, MongoDB:
//  - Precisam de uma conexao ativa/constante entre o db e a aplicacao
//  - Eh custoso para eles abrirem novas conexoes
//  - Com funcoes serverless, toda vez que realizarmos uma operacao no db sera aberta uma nova conexao(ja que nao temos um servidor
//  24/7), o que acaba sendo muito custoso

// Estaremos sempre usando o Fauna em producao

// O Fauna eh um banco nao relacional e schema free(nao existem colunas, ao inves sao chamados de documents e cada document pode ter
// campos e dados diferentes)
// Quando queremos buscar ou ordenar um dado por um campo especifico eh necessario criar um index, pois isso tornara essas acoes mais
// performaticas
// Todos os dados que sao armazenados pelo Fauna ficam em uma chave chamada data, por isso para definir um index utiliza data.email

import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
});