const {contas} = require ('../bancodedados')
const {getConta} = require ('../utilitarios')


  //validarSenhaDoBanco
  const validarSenhaDoBanco = (req, res, next) => {
    const { senha_banco } = req.query;
  
    if (!senha_banco) {
      return res.status(404).json({ mensagem: "Senha não informada." });
    }
  
    if (senha_banco !== "Cubos123Bank") {
      return res.status(404).json({ mensagem: "Senha incorreta." });
    }
    next();
  };
  //Validar o nome
  const validadorDeNome = (req, res, next) => {
    const { nome } = req.body;
  
    if (!nome) {
      return res.status(400).json({ mensagem: "Informar o nome é obrigatorio." });
    }
    next();
  };
  //Validar o CPF
  const validadorDeCpf = (req, res, next) => {
    const { cpf } = req.body;
    if (!cpf) {
      return res.status(400).json({ mensagem: "Informar o CPF é obrigatorio." });
    }
    next();
  };
  //Validar a data de nascimento
  const validadorDeData = (req, res, next) => {
    const { data_nascimento } = req.body;
    if (!data_nascimento) {
      return res
        .status(400)
        .json({ mensagem: "Informar a data de nascimento é obrigatorio." });
    }
    next();
  };
  //Validar telefone
  const validadorDeTelefone = (req, res, next) => {
    const { telefone } = req.body;
    if (!telefone) {
      return res
        .status(400)
        .json({ mensagem: "Informar o telefone é obrigatorio." });
    }
    next();
  };
  //Validar email
  const validadorDeEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ mensagem: "Informar o e-mail é obrigatorio." });
    }
    next();
  };
  //Validar Senha
  const validadorDeSenha = (req, res, next) => {
    const { senha } = req.body;
    if (!senha) {
      return res
        .status(400)
        .json({ mensagem: "Informar a senha é obrigatorio." });
    }
    next();
  };
  //Verificar CPF existente
  const verificadorDeCpf = (req, res, next) => {
    const { cpf } = req.body;
  
 
    const buscarCPF = contas.find((contaCPF) => {
      return contaCPF.usuario.cpf == cpf;
    });
    if (buscarCPF) {
      return res
        .status(400)
        .json({ mensagem: "CPF já cadastrado, por favor verifique" });
    }
    if (isNaN(Number(cpf)) || cpf.length !== 11) {
      return res
        .status(400)
        .json({ mensagem: "Insira um CPF valido, só numeros são aceitos." });
    }
    next();
  };
  
  //Verificar email existente
  const verificadorDeEmail = (req, res, next) => {
    const { email } = req.body;
  
    const buscarEmail = contas.find((contaEmail) => {
      return contaEmail.usuario.email == email;
    });
  
    if (buscarEmail) {
      return res
        .status(400)
        .json({ mensagem: "E-mail já cadastrado, por favor verifique" });
    }
    next();
  };
  
  //Verificar conta existente no parametro
  const verificarId = (req, res, next) => {
    const { numeroConta } = req.params;
  
    const contaEncontrada = getConta(numeroConta);
  
    if (isNaN(Number(numeroConta))) {
      return res
        .status(400)
        .json({ mensagem: "Informe um numero de conta valido." });
    }
    if (!contaEncontrada) {
      return res
        .status(404)
        .json({ mensagem: "Numero da conta não encontrado." });
    }
    next();
  };
  
  //Verificar body na atualização da conta
  const verificarBody = (req, res, next) => {
    const { cpf, email } = req.body;
  
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ mensagem: "É necessario preencher um campo." });
    }
    if (cpf) {
      verificadorDeCpf(req, res, next);
    } else if (email) {
      verificadorDeEmail(req, res, next);
    } else {
      next();
    }
  };
  
  //Validar exclusão de contas
  const validarExcluirConta = (req, res, next) => {
    const { numeroConta } = req.params;
  
    const contaEncontrada = getConta(numeroConta);
  
    if (contaEncontrada.saldo !== 0) {
      return res.status(400).json({
        mensagem:
          "É necessário que o saldo esteja zerado para a exclusão da conta, por favor saque ou transfira o valor remanescente.",
      });
    }
    next();
  };
  
  //Validar numero de conta informado
  const validadorConta = (req, res, next) => {
    const { numero } = req.body;
  
    if (!numero) {
      return res
        .status(400)
        .json({ mensagem: "É obrigatorio informar o numero da conta." });
    }
    if (isNaN(Number(numero))) {
      return res
        .status(400)
        .json({ mensagem: "Informe um numero de conta valido." });
    }
    next();
  };
  
  //Verificar valor do deposito
  const verificarValor = (req, res, next) => {
    const { valor } = req.body;
  
    if (!valor) {
      return res
        .status(404)
        .json({ mensagem: "É obrigatorio informar o valor." });
    }
    if (valor < 0 || isNaN(Number(valor)) || valor !== Number(valor)) {
      return res.status(404).json({ mensagem: "Informe um valor valido." });
    }
    next();
  };
  
  //Verificar se a conta existe
  const verificarConta = (req, res, next) => {
    const { numero } = req.body;
  
    const contaVerificada = getConta(numero);
  
    if (!contaVerificada) {
      return res.status(404).json({ mensagem: "Conta não encontrada." });
    }
    next();
  };
  
  //Verificar se a senha foi informada
  const verificarSenha = (req, res, next) => {
    const { senha, numero } = req.body;
  
    const contaSaque = getConta(numero);
  
    if (!senha) {
      return res
        .status(400)
        .json({ mensagem: "É obrigatorio informar a senha da conta." });
    }
    if (senha !== contaSaque.usuario.senha) {
      return res.status(400).json({ mensagem: "Senha incorreta" });
    }
    next();
  };
  //Validar valor do saque
  const validarSaque = (req, res, next) => {
    const { valor, numero } = req.body;
  
    const contaSaque = getConta(numero);
  
    if (valor > contaSaque.saldo) {
      return res.status(400).json({ mensagem: "Saldo insuficiente" });
    }
    next();
  };
  
  //Verificar conta de destino da transferencia
  const verificarDestino = (req, res, next) => {
    const { numeroDestino } = req.body;
  
    if (!numeroDestino) {
      return res.status(400).json({
        mensagem: "É obrigatorio informar o numero da conta de destino .",
      });
    }
    if (isNaN(Number(numeroDestino))) {
      return res
        .status(400)
        .json({ mensagem: "Informe um numero de conta de destino valido." });
    }
    next();
  };
  // Validar se a transferencia é valida
  const validarTransferencia = (req, res, next) => {
    const { numero, numeroDestino } = req.body;
  
    const contaSaida = getConta(numero);
    const contaEntrada = getConta(numeroDestino);
  
    if(!contaEntrada) {
      return res
        .status(400)
        .json({ mensagem: "Conta de destino não existe!" });
    }
    if (contaSaida.numero === contaEntrada.numero) {
      return res
        .status(400)
        .json({ mensagem: "Conta de origem e de destino não podem ser iguais." });
    }
    next();
  };
  
  //Validar as informações das tranasções
  const validarTransacoes = (req, res, next) => {
    const { numero, senha } = req.query;
  
    if (!numero) {
      return res
        .status(400)
        .json({ mensagem: "É obrigatorio informar o numero da conta." });
    }
    if (isNaN(Number(numero))) {
      return res
        .status(400)
        .json({ mensagem: "Informe um numero de conta valido." });
    }
    if (!senha) {
      return res.status(404).json({ mensagem: "Senha não informada." });
    }
    const contaVerificada = getConta(numero);
  
    if (!contaVerificada) {
      return res.status(404).json({ mensagem: "Conta não encontrada." });
    }
    if (senha !== contaVerificada.usuario.senha) {
      return res.status(404).json({ mensagem: "Senha incorreta." });
    }
    next();
  };
  
  
  module.exports = {
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
    validarExcluirConta,
    validadorConta,
    verificarValor,
    verificarConta,
    verificarSenha,
    validarSaque,
    verificarDestino,
    validarTransferencia,
    validarTransacoes
  };
  