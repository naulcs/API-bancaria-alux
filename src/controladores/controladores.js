const {
  contas,
  depositos,
  saques,
  transferencias,
} = require("../bancodedados");

const { getConta } = require("../utilitarios");

const listarUsuarios = (req, res) => {
  return res.send(contas);
};

//Criar conta
const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  let ultimoNumeroDaConta = contas.length > 0 ? contas[contas.length - 1].numero : 0;


  let senhaString = "";

  let numeroDaConta = ultimoNumeroDaConta + 1;
  ultimoNumeroDaConta = numeroDaConta;

  if (typeof senha === "number") {
    senhaString = senha.toString();
  } else {
    senhaString = senha;
  }

  const dadosDeCadastro = {
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha: senhaString,
  };

  const dadosDaConta = {
    numero: numeroDaConta,
    saldo: 0,
    usuario: dadosDeCadastro,
  };

  contas.push(dadosDaConta);
  return res.status(201).json(dadosDaConta);
};
//Atualizar Conta
const attConta = (req, res) => {
  const { nome, cpf, dataNascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  const contaEncontrada = getConta(numeroConta);
  if (nome) {
    contaEncontrada.usuario.nome = nome;
  }
  if (cpf) {
    contaEncontrada.usuario.cpf = cpf;
  }
  if (dataNascimento) {
    contaEncontrada.usuario.data_nascimento = dataNascimento;
  }
  if (telefone) {
    contaEncontrada.usuario.telefone = telefone;
  }
  if (email) {
    contaEncontrada.usuario.email = email;
  }
  if (senha) {
    contaEncontrada.usuario.senha = senha.trim();
  }

  return res.status(201).json({ mensagem: "Conta atualizada com sucesso." });
};
//Excluir conta
const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  const contaEncontrada = getConta(numeroConta);

  const contaExcluida = contas.findIndex((conta) => {
    return conta.numero === contaEncontrada.numero;
  });
  contas.splice(contaExcluida, 1);

  return res.status(201).json({ mensagem: "Conta excluída com sucesso!" });
};
//Depositar saldo na conta
const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  const contaDeposito = getConta(numero_conta);

  contaDeposito.saldo += valor;

  const dataAtual = new Date();
  const dataFormatada = `${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`;

  const dadosDoDeposito = {
    data: dataFormatada,
    numero_conta: numero_conta,
    valor: valor,
  };

  depositos.push(dadosDoDeposito);
  return res.status(201).json({ mensagem: "Deposito realizado com sucesso!" });
};

//Realizar saque das contas
const sacar = (req, res) => {
  const { numero_conta, valor } = req.body;

  const contaSaque = getConta(numero_conta);

  contaSaque.saldo -= valor;

  const dataAtual = new Date();
  const dataFormatada = `${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`;

  const dadosDoSaque = {
    data: dataFormatada,
    numero_conta: numero_conta,
    valor: valor,
  };
  saques.push(dadosDoSaque);
  return res.status(201).json({ mensagem: "Saque realizado com sucesso!" });
};

//Realizar transferencias
const transferir = (req, res) => {
  const { numero_conta, valor, numeroDestino } = req.body;

  const contaSaida = getConta(numero_conta);
  const contaEntrada = getConta(numeroDestino);

  contaSaida.saldo -= valor;
  contaEntrada.saldo += valor;

  const dataAtual = new Date();
  const dataFormatada = `${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`;

  const dadosDaTransferencia = {
    data: dataFormatada,
    numero_conta_origem: numero_conta,
    numero_conta_destino: numeroDestino,
    valor: valor,
  };
  transferencias.push(dadosDaTransferencia);

  return res
    .status(201)
    .json({ mensagem: "Transferencia realizada com sucesso!" });
};

//Mostrar o saldo de uma conta
const mostrarSaldo = (req, res) => {
  const { numero_conta } = req.query;

  const contaEncontrada = getConta(numero_conta);

  const saldo = contaEncontrada.saldo;
  return res.status(200).json({ saldo: saldo });
};

const mostrarExtrato = (req, res) => {
  const { numero_conta } = req.query;

  const contaDeposito = depositos.filter((conta) => {
    return conta.numero_conta == Number(numero_conta);
  });
  const contaSaque = saques.filter((conta) => {
    return conta.numero_conta == Number(numero_conta);
  });
  const transferenciaEnviada = transferencias.filter((conta) => {
    return conta.numero_conta_origem == Number(numero_conta);
  });
  const transferenciaRecebida = transferencias.filter((conta) => {
    return conta.numero_conta_destino == Number(numero_conta);
  });

  return res.status(200).json({
    depositos: contaDeposito,
    saques: contaSaque,
    transferenciasEnviadas: transferenciaEnviada,
    transferenciasRecebidas: transferenciaRecebida,
  });
};
module.exports = {
  listarUsuarios,
  criarConta,
  attConta,
  excluirConta,
  depositar,
  sacar,
  transferir,
  mostrarSaldo,
  mostrarExtrato,
};
