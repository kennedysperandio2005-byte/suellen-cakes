const NUMERO_WHATSAPP = "5527995336204";

function calcularTotal() {
    let total = 0;
    
    // Cálculo dos Bolos
    const checkBolo = document.getElementById('check-bolo');
    const selectAndares = document.getElementById('select-andares');
    if (checkBolo && checkBolo.checked && selectAndares) {
        if (selectAndares.value === "1") total += 130;
        else if (selectAndares.value === "2") total += 220;
        else if (selectAndares.value === "3") total += 310;
    }

    // Cálculo dos Doces
    const checkDoces = document.getElementById('check-doces');
    const selectDoces = document.getElementById('select-doces-qtd');
    if (checkDoces && checkDoces.checked && selectDoces) {
        if (selectDoces.value === "50") total += 60;
        else if (selectDoces.value === "100") total += 110;
    }

    const valorFormatado = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    const precoTotalEl = document.getElementById('preco-total');
    if (precoTotalEl) precoTotalEl.innerText = valorFormatado;
}

function irParaResumoOrcamento() {
    const painelCalculadora = document.getElementById('painel-calculadora');
    const secaoDetalhada = document.getElementById('secao-orcamento-detalhado');
    const barraTop = document.getElementById('barra-top-navegacao');

    if (painelCalculadora) painelCalculadora.style.display = 'none';
    if (secaoDetalhada) secaoDetalhada.style.display = 'block';
    if (barraTop) barraTop.style.display = 'flex';

    // Monta a lista detalhada do pedido
    const listaItens = document.getElementById('lista-itens-orcamento');
    if (listaItens) {
        listaItens.innerHTML = '';
        const checkBolo = document.getElementById('check-bolo');
        const selectAndares = document.getElementById('select-andares');
        const checkDoces = document.getElementById('check-doces');
        const selectDoces = document.getElementById('select-doces-qtd');

        if (checkBolo && checkBolo.checked && selectAndares) {
            const item = document.createElement('p');
            item.className = 'item-detalhe-linha';
            item.innerText = `Bolo Personalizado - ${selectAndares.options[selectAndares.selectedIndex].text}`;
            listaItens.appendChild(item);
        }

        if (checkDoces && checkDoces.checked && selectDoces) {
            const item = document.createElement('p');
            item.className = 'item-detalhe-linha';
            item.innerText = `Doces Finos & Tradicionais - ${selectDoces.options[selectDoces.selectedIndex].text}`;
            listaItens.appendChild(item);
        }

        if (listaItens.children.length === 0) {
            listaItens.innerHTML = '<p class="item-detalhe-linha">Nenhum item selecionado.</p>';
        }
    }

    const precoTotalTexto = document.getElementById('preco-total')?.innerText || "R$ 0,00";
    const precoTotalDetalhado = document.getElementById('preco-total-detalhado');
    const precoCarrinhoTop = document.getElementById('preco-carrinho-top');

    if (precoTotalDetalhado) precoTotalDetalhado.innerText = precoTotalTexto;
    if (precoCarrinhoTop) precoCarrinhoTop.innerText = precoTotalTexto;

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
    
    let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
    
    const linhasItens = document.querySelectorAll('.item-detalhe-linha');
    if (linhasItens.length > 0) {
        linhasItens.forEach(linha => {
            mensagem += `• ${linha.innerText}\n`;
        });
    } else {
        mensagem += `• Pedido personalizado conforme orçamento.\n`;
    }

    mensagem += `\n*Total Estimado:* ${precoTotal}`;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
