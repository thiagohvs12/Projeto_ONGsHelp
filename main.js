/**
 * Arquivo principal com funções globais utilizadas em todas as páginas
 */

// Função para inicializar componentes comuns
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicação ConectaVoluntários carregada');
    
    // Aqui podemos adicionar inicializações que são comuns a todas as páginas
    // Por exemplo: menu mobile, footer dinâmico, etc.
    
    // Verificar se há dados salvos e inicializar se necessário
    if (!localStorage.getItem('necessidades')) {
        localStorage.setItem('necessidades', JSON.stringify([]));
    }
});

/**
 * Função utilitária para formatar a data no formato brasileiro
 * @param {Date} data - Objeto Date a ser formatado
 * @returns {string} Data formatada como DD/MM/AAAA
 */
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
