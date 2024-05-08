Introdução
O Projeto de Gerenciamento de Cursos do Senai é uma aplicação de backend desenvolvida para oferecer funcionalidades de CRUD (Create, Read, Update, Delete) relacionadas a cursos do senai. Ele permite a criação, atualização, exclusão e recuperação de informações sobre cada pessoa de um curso , bem como funcionalidades adicionais, como batalhas entre cursos do senai e registro de histórico de batalhas.

Funcionalidades
Criação, leitura, atualização e exclusão (CRUD) de estudantes.
Realização de batalhas entre Professores/Estudantes.
Registro e consulta de histórico de batalhas.

Tecnologias Utilizadas
Node.js
Express.js
PostgreSQL

Como Usar

Clone o repositório para o seu ambiente local.
Instale as dependências do projeto usando npm install.
Configure o banco de dados PostgreSQL com o nome senaibattle e execute o script script.sql para criar as tabelas necessárias.
Abra o arquivo index.js e ajuste as configurações do banco de dados conforme necessário (usuário, senha, host, porta).
Inicie o servidor executando npm run dev.
Acesse as diferentes rotas disponíveis conforme a documentação fornecida.

Documentação e teste de rotas

Testando as Rotas no Insomnia:

Para testar cada rota individualmente, siga estas instruções:

Rota para obter todos os lutadores
Método: GET
URL: http://localhost:4000/lutadoressenai
Rota para adicionar um novo Lutador
Método: POST
URL: http://localhost:4000/lutadoressenai
Corpo da Requisição (JSON): { "name": "classe", "vida": "ataque", "defesa", "velocidade" }
Rota para atualizar um Lutador
Método: PUT
URL: http://localhost:4000/lutadoressenai/{id}
Substitua {id} pelo ID do lutador que deseja atualizar.
Corpo da Requisição (JSON): { "name": "classe", "vida": "ataque", "defesa", "velocidade" }
Rota para deletar um lutador
Método: DELETE
URL: http://localhost:4000/lutadoressenai/{id}
Substitua {id} pelo ID do lutador que deseja deletar.
Rota para obter um lutador específico
Método: GET
URL: http://localhost:4000/lutadoressenai/{id}
Substitua {id} pelo ID do lutador que deseja recuperar.
Rota para obter um lutador com alguma letra
Método: GET
URL: http://localhost:4000/lutadoressenai/letra/{letra}
Substitua {letra} pela letra desejada.

Caso queira criar campos de batalha, siga o mesmo modelo dos lutadoressenai mas com alguma diferenças sendo elas:
URL : /tipoDoCampo
JSON : {"campoNome", "campoTipo"}
obs: essa rota não conta com a função de pesquisa por letra

Rota para batalha
Método: GET
URL: http://localhost:4000/campoDeBatalha/{id1}/{id2}/{idCampo}
Substitua {id1} , {id2} e {idCampo} pelos IDs dos lutadores e do campo que deseja colocar para batalhar.
Rota para obter o histórico de batalhas
Método: GET
URL: http://localhost:4000/campoDeBatalha
Rota para obter o histórico de batalhas com os dados dos lutadores
Método: GET
URL: http://localhost:4000/battles/{idLutador}
Aviso Importante:


Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para relatar bugs, propor melhorias ou enviar pull requests.
