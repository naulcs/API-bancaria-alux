const {
    validarSenhaDoBanco,
    validadorDeCpf,
    validadorDeData,
    validadorDeEmail,
    validadorDeNome,
    validadorDeSenha,
    validadorDeTelefone,
    verificadorDeCpf,
    verificadorDeEmail,
    verificarId,
    verificarBody,
    validadorConta,
    verificarValor,
    verificarConta,
    verificarSenha,
    validarSaque,
    verificarDestino,
    validarTransferencia,
    validarTransacoes,
    validarExcluirConta
    
  } = require("../validadores/validadores");
  
  const listarContas = validarSenhaDoBanco;
  
  const verificarContaCriada = [
    validadorDeCpf,
    validadorDeData,
    validadorDeEmail,
    validadorDeNome,
    validadorDeSenha,
    validadorDeTelefone,
    verificadorDeCpf,
    verificadorDeEmail
  ];
  
  const verificarAttConta = [verificarId, verificarBody, verificadorDeEmail,];
  
  const verificarExclusão = [verificarId, validarExcluirConta]
  
  const verificarDeposito = [validadorConta, verificarValor,
  verificarConta]
  
  const verificarSaque = [ validadorConta, verificarValor, verificarConta, verificarSenha, validarSaque ]
  
  const verificarTransfer = [validadorConta, verificarValor, verificarConta, verificarSenha, validarSaque, verificarDestino, validarTransferencia ]
  
  const verificarTransacoes = [validarTransacoes]
  
  
  module.exports = {
    listarContas,
    verificarContaCriada,
    verificarAttConta,
    verificarExclusão,
    verificarDeposito,
    verificarSaque,
    verificarTransfer,
    verificarTransacoes
  };
  