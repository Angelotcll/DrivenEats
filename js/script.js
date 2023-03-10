let nomePrato;
let nomeBebida;
let nomeSobremesa;
let precoPrato;
let precoBebida;
let precoSobremesa;

function converterPrecoNumero(preco){
  return Number(preco.replace("R$","").trim().replace(",","."));
}

function converterNumeroPreco(numero){
  const casasDecimais = 2;
  return String(numero.toFixed(casasDecimais)).replace(".",",");
}

function selecionarPrato(prato) {
  const pratoAnterior = document.querySelector(".pratos .selected");

  if (pratoAnterior ) {
    pratoAnterior.classList.remove("selected");
  }

  prato.classList.add("selected");
  nomePrato = prato.querySelector("h3").innerText;
  precoPrato = converterPrecoNumero(prato.querySelector(".price").innerText);

  contarSelecionados();
}

function selecionarBebida(bebida) {
  const bebidaAnterior = document.querySelector(".bebidas .selected");

  if (bebidaAnterior) {
    bebidaAnterior.classList.remove("selected");
  }

  bebida.classList.add("selected");
  nomeBebida = bebida.querySelector("h3").innerText;
  precoBebida = converterPrecoNumero(bebida.querySelector(".price").innerText);
  contarSelecionados();
}

function selecionarSobremesa(sobremesa) {
  const sobremesaAnterior = document.querySelector(".sobremesas .selected");

  if (sobremesaAnterior) {
      sobremesaAnterior.classList.remove("selected");
  }

  sobremesa.classList.add("selected");
  nomeSobremesa = sobremesa.querySelector("h3").innerText;
  precoSobremesa = converterPrecoNumero(sobremesa.querySelector(".price").innerText);

  contarSelecionados();
}

function contarSelecionados(){
  const selecionados = document.querySelectorAll(".selected").length;
  const numeroDeItensSelecionados = 3;

  if(selecionados === numeroDeItensSelecionados){
    habilitaBotao();
  }
}

function habilitaBotao(){
  const botao = document.querySelector(".fechar-pedido button");

  botao.classList.add("enabled");
  botao.innerText = "Fechar pedido";
  botao.removeAttribute("disabled");
}

function fecharPedido(){
  const modal = document.querySelector(".modal");
  const tabela = modal.querySelector(".pedido");
  const precoTotal = precoPrato + precoBebida + precoSobremesa;
  let conteudoTabela = "";
  
  conteudoTabela += `<tr> <th>${scope=""} </th>  <th> ${scope=""} </th> </tr>`;
  conteudoTabela += `<tr> <td>${nomePrato}</td> <td>${converterNumeroPreco(precoPrato)}</td> </tr>`;
  conteudoTabela += `<tr> <td>${nomeBebida}</td> <td>${converterNumeroPreco(precoBebida)}</td> </tr>`;
  conteudoTabela += `<tr> <td>${nomeSobremesa}</td> <td>${converterNumeroPreco(precoSobremesa)}</td> </tr>`;
  conteudoTabela += `<tr> <td>Total</td> <td>R$ ${converterNumeroPreco(precoTotal)}</td> </tr>`;

  tabela.innerHTML = conteudoTabela;

  modal.classList.add("open");
}

function voltar(){
  document.querySelector(".modal").classList.remove("open");
}

function confirmaPedido(){
  const nome = prompt("Por favor, digite seu nome");
  const endereco = prompt("Por favor, digite seu endere??o");
  let textoMensagem = "Ol??, gostaria de fazer o pedido:\r\n";
  
  textoMensagem += `- Prato: ${nomePrato}\r\n`;
  textoMensagem += `- Bebida: ${nomeBebida}\r\n`;
  textoMensagem += `- Sobremesa: ${nomeSobremesa}\r\n`;
  textoMensagem += `Total: ${document.querySelector(".pedido tr:last-child td:last-child").innerText}\r\n`;
  textoMensagem += `Nome: ${nome}\r\n`;
  textoMensagem += `Endere??o: ${endereco}\r\n`;

  const url = `https://wa.me/5551999999999?text=${encodeURIComponent(textoMensagem)}`;

  window.location.href = url;
}
