const { contas } = require("./bancodedados");
const getConta = (numeroConta) => {
  return contas.find((conta) => {
    return conta.numero == Number(numeroConta);
  });
}

module.exports= {getConta}