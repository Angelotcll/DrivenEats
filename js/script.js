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
  return String(numero.toFixed(2)).replace(".",",");
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

function fecharPedido(){
  const modal = document.querySelector(".modal");
  const tabela = modal.querySelector(".pedido");
  const precoTotal = precoPrato + precoBebida + precoSobremesa;
  let conteudoTabela = "";     
  
  conteudoTabela += `<tr> <td>${nomePrato}</td> <td>${converterNumeroPreco(precoPrato)}</td> </tr>`;
  conteudoTabela += `<tr> <td>${nomeBebida}</td> <td>${converterNumeroPreco(precoBebida)}</td> </tr>`;
  conteudoTabela += `<tr> <td>${nomeSobremesa}</td> <td>${converterNumeroPreco(precoSobremesa)}</td> </tr>`;
  conteudoTabela += `<tr> <td>Total</td> <td>R$ ${converterNumeroPreco(precoTotal)}</td> </tr>`;

  tabela.innerHTML = conteudoTabela;

  modal.classList.add("open");
}

function contarSelecionados(){
  const selecionados = document.querySelectorAll(".selected").length;

  if(selecionados === 3){
    habilitaBotao();
  }
}

function habilitaBotao(){
  const botao = document.querySelector(".fechar-pedido button");

  botao.classList.add("enabled");
  botao.innerText = "Fechar pedido";
  botao.removeAttribute("disabled");
}

function voltar(){
  document.querySelector(".modal").classList.remove("open");
}

function confirmaPedido(){
  let textoMensagem = "Olá, gostaria de fazer o pedido:\r\n";

  textoMensagem += `- Prato: ${nomePrato}\r\n`;
  textoMensagem += `- Bebida: ${nomeBebida}\r\n`;
  textoMensagem += `- Sobremesa: ${nomeSobremesa}\r\n`;
  textoMensagem += `Total: ${document.querySelector(".pedido tr:last-child td:last-child").innerText}`;

  const url = `https://wa.me/5551995752403?text=${encodeURIComponent(textoMensagem)}`;

  window.location.href = url;
}
