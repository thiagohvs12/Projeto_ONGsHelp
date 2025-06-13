// Lógica da página de visualização de necessidades


document.addEventListener('DOMContentLoaded', function() {
    const listaNecessidades = document.getElementById('listaNecessidades');
    const campoBusca = document.getElementById('busca');
    const filtroTipo = document.getElementById('filtroTipo');
    
    // Carregar e exibir as necessidades ao carregar a página
    carregarNecessidades();
    
    // Adicionar eventos para filtros
    campoBusca.addEventListener('input', filtrarNecessidades);
    filtroTipo.addEventListener('change', filtrarNecessidades);
    
     //Carrega as necessidades do localStorage e exibe na página
     
    function carregarNecessidades() {
        // Obter as necessidades do localStorage
        const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        
        // Ordenar por data de cadastro (mais recentes primeiro)
        necessidades.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));
        
        // Exibir as necessidades
        exibirNecessidades(necessidades);
    }
    function criarCardNecessidade(necessidade) {
        const card = document.createElement('div');
        card.className = 'card-necessidade';
        
        // Formatar a data para exibição
        const dataCadastro = new Date(necessidade.dataCadastro);
        const dataFormatada = formatarData(dataCadastro);
        
        // Criar o conteúdo do card
        card.innerHTML = `
            <h3>${necessidade.tituloNecessidade}</h3>
            <div class="instituicao">${necessidade.nomeInstituicao}</div>
            <div class="tipo">${necessidade.tipoAjuda}</div>
            <div class="descricao">${necessidade.descricaoNecessidade}</div>
            <div class="local">
                <strong>Local:</strong> ${necessidade.rua}, ${necessidade.bairro} - ${necessidade.cidade}/${necessidade.estado}
            </div>