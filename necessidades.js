document.addEventListener('DOMContentLoaded', function() {
    const listaNecessidades = document.getElementById('listaNecessidades');
    const campoBusca = document.getElementById('busca');
    const filtroTipo = document.getElementById('filtroTipo');
    
    // Carregar e exibir as necessidades ao carregar a página
    carregarNecessidades();
    
    // Adicionar eventos para filtros
    campoBusca.addEventListener('input', filtrarNecessidades);
    filtroTipo.addEventListener('change', filtrarNecessidades);
    
    /**
     * Carrega as necessidades do localStorage e exibe na página
     */
    function carregarNecessidades() {
        // Obter as necessidades do localStorage
        const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        
        // Ordenar por data de cadastro (mais recentes primeiro)
        necessidades.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));
        
        // Exibir as necessidades
        exibirNecessidades(necessidades);
    }
    
    /**
     * Exibe as necessidades na página
     * @param {Array} necessidades - Array de objetos de necessidade
     */
    function exibirNecessidades(necessidades) {
        listaNecessidades.innerHTML = '';
        
        if (necessidades.length === 0) {
            listaNecessidades.innerHTML = '<p class="sem-resultados">Nenhuma necessidade cadastrada no momento.</p>';
            return;
        }
        
        necessidades.forEach(necessidade => {
            const card = criarCardNecessidade(necessidade);
            listaNecessidades.appendChild(card);
        });
    }
    
    /**
     * Cria um elemento HTML para representar uma necessidade
     * @param {Object} necessidade - Objeto com os dados da necessidade
     * @returns {HTMLElement} Elemento HTML do card
     */
    function criarCardNecessidade(necessidade) {
        const card = document.createElement('div');
        card.className = 'card-necessidade';
        
        // Formatar a data para exibição
        const dataCadastro = new Date(necessidade.dataCadastro);
        const dataFormatada = dataCadastro.toLocaleDateString('pt-BR');
        
        // Criar o conteúdo do card
        card.innerHTML = `
            <h3>${necessidade.tituloNecessidade}</h3>
            <div class="instituicao">${necessidade.nomeInstituicao}</div>
            <div class="tipo">${necessidade.tipoAjuda}</div>
            <div class="descricao">${necessidade.descricaoNecessidade}</div>
            <div class="local">
                <strong>Local:</strong> ${necessidade.rua}, ${necessidade.bairro} - ${necessidade.cidade}/${necessidade.estado}
            </div>
            <div class="contato">
                <strong>Contato:</strong> ${necessidade.contato}
            </div>
            <div class="data">
                <small>Cadastrado em: ${dataFormatada}</small>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Filtra as necessidades com base nos critérios de busca
     */
    function filtrarNecessidades() {
        const termoBusca = campoBusca.value.toLowerCase();
        const tipoSelecionado = filtroTipo.value;
        
        // Obter todas as necessidades
        const todasNecessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        
        // Filtrar as necessidades
        const necessidadesFiltradas = todasNecessidades.filter(necessidade => {
            // Verificar o filtro por tipo
            if (tipoSelecionado !== 'todos' && necessidade.tipoAjuda !== tipoSelecionado) {
                return false;
            }
            
            // Verificar a busca por termo
            if (termoBusca) {
                const textoBusca = `${necessidade.tituloNecessidade} ${necessidade.descricaoNecessidade}`.toLowerCase();
                return textoBusca.includes(termoBusca);
            }
            
            return true;
        });
        
        // Exibir as necessidades filtradas
        exibirNecessidades(necessidadesFiltradas);
    }
});