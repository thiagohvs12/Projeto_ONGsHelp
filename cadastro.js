// Lógica do formulário de cadastro de necessidades

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

    // Função para buscar endereço pelo CEP
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
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                exibirMensagem('Erro ao buscar CEP. Tente novamente.', 'erro');
            });
    }

    // Valida todos os campos do formulário
    function validarFormulario() {
        let valido = true;
        const camposObrigatorios = formNecessidade.querySelectorAll('[required]');

        camposObrigatorios.forEach(campo => {
            if (!campo.value.trim()) {
                campo.style.borderColor = '#e74c3c';
                valido = false;

                // Remove o destaque ao preencher
                campo.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            } else {
                // Validações específicas
                if (campo.id === 'contato') {
                    if (!validarContato(campo.value)) {
                        exibirMensagem('Informe um e-mail ou telefone válido', 'erro');
                        campo.style.borderColor = '#e74c3c';
                        valido = false;
                    }
                }
                if (campo.id === 'cep' && campo.value.replace(/\D/g, '').length !== 8) {
                    exibirMensagem('CEP deve ter 8 dígitos', 'erro');
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
                }
            }
        });
        return valido;
    }

    /**
     * Valida se o contato é um e-mail ou telefone válido
     * @param {string} contato - Valor do campo de contato
     * @returns {boolean} True se for válido, False caso contrário
     */
    function validarContato(contato) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefone = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        return regexEmail.test(contato) || regexTelefone.test(contato);
    }

    /**
     * Salva a necessidade no localStorage
     */
    function salvarNecessidade() {
        const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        const id = Date.now().toString();

        const novaNecessidade = {
            id: id,
            nomeInstituicao: document.getElementById('nomeInstituicao').value,
            tipoAjuda: document.getElementById('tipoAjuda').value,
            tituloNecessidade: document.getElementById('tituloNecessidade').value,
            descricaoNecessidade: document.getElementById('descricaoNecessidade').value,
            cep: document.getElementById('cep').value,
            rua: document.getElementById('rua').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            contato: document.getElementById('contato').value,
            dataCadastro: new Date().toISOString()
        };

        necessidades.push(novaNecessidade);
        localStorage.setItem('necessidades', JSON.stringify(necessidades));
    }

    // Função para exibir mensagens (exemplo simples)
    function exibirMensagem(mensagem, tipo) {
        alert(mensagem); // Você pode substituir por um sistema de mensagens mais elaborado
    }
});
