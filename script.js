// Alterne para o número de WhatsApp da sua loja (somente números com DDD)
const NUMERO_WHATSAPP = "5531999999999"; 

function irParaResumoOrcamento() {
    const painelCalculadora = document.getElementById('painel-calculadora');
    const secaoDetalhada = document.getElementById('secao-orcamento-detalhado');
    const barraTop = document.getElementById('barra-top-navegacao');

    // Alterna a exibição das telas
    if (painelCalculadora) painelCalculadora.style.display = 'none';
    if (secaoDetalhada) secaoDetalhada.style.display = 'block';
    if (barraTop) barraTop.style.display = 'flex';

    // Atualiza o valor total no topo e na tela detalhada
    const precoTotalTexto = document.getElementById('preco-total')?.innerText || "R$ 0,00";
    document.getElementById('preco-total-detalhado').innerText = precoTotalTexto;
    document.getElementById('preco-carrinho-top').innerText = precoTotalTexto;

    // Rola a tela até o início suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarParaInicio() {
    const painelCalculadora = document.getElementById('painel-calculadora');
    const secaoDetalhada = document.getElementById('secao-orcamento-detalhado');
    const barraTop = document.getElementById('barra-top-navegacao');

    if (painelCalculadora) painelCalculadora.style.display = 'block';
    if (secaoDetalhada) secaoDetalhada.style.display = 'none';
    if (barraTop) barraTop.style.display = 'none';
}

function enviarPedidoWhatsApp() {
    const precoTotal = document.getElementById('preco-total-detalhado')?.innerText || "R$ 0,00";
    
    // Monta a mensagem enviada ao WhatsApp
    let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
    
    // Captura os itens listados no resumo
    const linhasItens = document.querySelectorAll('.item-detalhe-linha');
    if (linhasItens.length > 0) {
        linhasItens.forEach(linha => {
            mensagem += `• ${linha.innerText}\n`;
        });
    } else {
        mensagem += `• Pedido personalizado conforme orçamento.\n`;
    }

    mensagem += `\n*Total Estimado:* ${precoTotal}`;

    // Abre o link do WhatsApp
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
