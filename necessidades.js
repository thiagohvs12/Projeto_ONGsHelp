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