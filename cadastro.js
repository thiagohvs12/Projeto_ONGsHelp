
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

        if (cep.length === 8) {
            buscarEnderecoPorCEP(cep);
        }
    });
    
    // Validação e envio do formulário
    formNecessidade.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            salvarNecessidade();
            formNecessidade.reset();
            exibirMensagem('Necessidade cadastrada com sucesso!', 'sucesso');
        }
    });
    function buscarEnderecoPorCEP(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.uf || '';
                } else {
                    exibirMensagem('CEP não encontrado', 'erro');
                }
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                    exibirMensagem('Erro ao buscar CEP. Tente novamente.', 'erro');
                });
        }
        
        
         //Valida todos os campos do formulário
         // @returns {boolean} True se todos os campos são válidos, False caso contrário
        
        function validarFormulario() {
            let valido = true;
            const camposObrigatorios = formNecessidade.querySelectorAll('[required]');
            
            camposObrigatorios.forEach(campo => {
                if (!campo.value.trim()) {
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
            })
            // Adiciona um evento para remover o destaque quando o campo for preenchido
            campo.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '';
                }
            });
        } else {
            // Validações específicas para alguns campos
            if (campo.id === 'contato') {
                if (!validarContato(campo.value)) {
                    exibirMensagem('Informe um e-mail ou telefone válido', 'erro');
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
                }
            }