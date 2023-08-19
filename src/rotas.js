const express = require('express')
const { verificarTransacoes, listarContas, verificarContaCriada, verificarAttConta, verificarExclusão, verificarDeposito, verificarSaque, verificarTransfer } = require('./intermediarios/intermediarios')
const { listarUsuarios, criarConta, attConta, excluirConta, depositar, sacar, transferir, mostrarSaldo, mostrarExtrato } = require('./controladores/controladores')

const rotas = express()


rotas.get ('/contas/', listarContas, listarUsuarios)
rotas.post ('/contas/', verificarContaCriada, criarConta)
rotas.put ('/contas/:numeroConta/usuario', verificarAttConta, attConta)
rotas.delete ('/contas/:numeroConta', verificarExclusão, excluirConta)
rotas.post ('/transacoes/depositar', verificarDeposito, depositar)
rotas.post ('/transacoes/sacar', verificarSaque, sacar)
rotas.post ('/transacoes/transferir', verificarTransfer, transferir)
rotas.get ('/contas/saldo', verificarTransacoes, mostrarSaldo )
rotas.get ('/contas/extrato', verificarTransacoes, mostrarExtrato )


module.exports = rotas