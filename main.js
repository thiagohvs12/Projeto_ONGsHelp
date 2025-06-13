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
}/**
 * Função para exibir mensagens de feedback para o usuário
 * @param {string} mensagem - Texto da mensagem
 * @param {string} tipo - Tipo da mensagem (sucesso, erro, aviso)
 * @param {HTMLElement} container - Elemento onde a mensagem será exibida
 */
function exibirMensagem(mensagem, tipo = 'sucesso', container = document.body) {
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem mensagem-${tipo}`;
    divMensagem.textContent = mensagem;
    
    // Estilos inline para a mensagem (poderia estar no CSS também)
    divMensagem.style.position = 'fixed';
    divMensagem.style.top = '20px';
    divMensagem.style.right = '20px';
    divMensagem.style.padding = '15px';
    divMensagem.style.borderRadius = '4px';
    divMensagem.style.color = 'white';
    divMensagem.style.zIndex = '1000';
    divMensagem.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    if (tipo === 'sucesso') {
        divMensagem.style.backgroundColor = '#27ae60';
    } else if (tipo === 'erro') {
        divMensagem.style.backgroundColor = '#e74c3c';
    } else {
        divMensagem.style.backgroundColor = '#f39c12';
    }
    container.appendChild(divMensagem);
    
    // Remover a mensagem após 5 segundos
    setTimeout(() => {
        divMensagem.style.opacity = '0';
        divMensagem.style.transition = 'opacity 0.5s';
        setTimeout(() => divMensagem.remove(), 500);
    }, 5000);
}
