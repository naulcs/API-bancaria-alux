
# API do banco ALux

A API do banco Alux é uma interface de programação de aplicações que permite aos desenvolvedores integrarem seus sistemas com os serviços financeiros do banco Alux, um banco digital que oferece soluções inovadoras e personalizadas para seus clientes.

API do Banco Alux com Express
A API do Banco Alux é uma plataforma construída utilizando o framework Express para Node.js. Ela oferece funcionalidades bancárias essenciais para gerenciar contas bancárias e realizar operações financeiras de forma eficiente.

Funcionalidades
A API do Banco Alux, construída com o framework Express, oferece as seguintes funcionalidades:

1. Listagem de Contas Bancárias
Endpoint: GET /contas

Este endpoint permite listar todas as contas bancárias registradas no sistema.

2. Criar Conta Bancária
Endpoint: POST /contas

Crie uma nova conta bancária fornecendo os detalhes necessários, como nome do titular, tipo de conta e saldo inicial.

3. Atualizar Dados do Usuário da Conta Bancária
Endpoint: PUT /contas/{id}

Atualize os dados do usuário da conta bancária, como nome, informações de contato, etc.

4. Excluir Conta Bancária
Endpoint: DELETE /contas/{id}

Exclua uma conta bancária pelo seu ID.

5. Depositar em Conta Bancária
Endpoint: POST /contas/{id}/depositar

Realize um depósito em uma conta bancária específica, fornecendo o valor a ser depositado.

6. Sacar de Conta Bancária
Endpoint: POST /contas/{id}/sacar

Realize um saque de uma conta bancária específica, fornecendo o valor a ser sacado.

7. Transferir Valores entre Contas Bancárias
Endpoint: POST /contas/{id_origem}/transferir

Realize uma transferência de valores entre duas contas bancárias, fornecendo o ID da conta de origem e o ID da conta de destino, além do valor a ser transferido.

8. Consultar Saldo da Conta Bancária
Endpoint: GET /contas/{id}/saldo

Consulte o saldo atual de uma conta bancária específica.

9. Emitir Extrato Bancário
Endpoint: GET /contas/{id}/extrato

Emita um extrato bancário que lista todas as transações realizadas em uma conta bancária específica.

Requisições e Respostas
A API utiliza JSON para formatar as requisições e respostas. Consulte a documentação detalhada para saber mais sobre os campos necessários e as estruturas de dados.