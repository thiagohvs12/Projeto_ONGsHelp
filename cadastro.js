
  //Lógica do formulário de cadastro de necessidades


document.addEventListener('DOMContentLoaded', function() {
    const formNecessidade = document.getElementById('formNecessidade');
    const campoCep = document.getElementById('cep');
    
    // Máscara para o CEP
    campoCep.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length > 5) {
            valor = valor.substring(0, 5) + '-' + valor.substring(5, 8);
        }
        
        e.target.value = valor;
    });
    
    // Integração com ViaCEP
    campoCep.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');