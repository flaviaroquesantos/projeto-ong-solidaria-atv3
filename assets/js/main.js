document.addEventListener('DOMContentLoaded', function() {
    // FUNÇÕES DE MÁSCARA PARA GARANTIR A INTERATIVIDADE NO FORMULÁRIO

    const inputCPF = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCEP = document.getElementById('cep');

    /**
     * Aplica uma máscara de formatação a um campo de input.
     * @param {HTMLElement} input - O elemento input do DOM.
     * @param {string} mascara - A string de máscara (ex: '###.###.###-##').
     */
    function aplicarMascara(input, mascara) {
        let valor = input.value.replace(/\D/g, ''); // 1. Remove tudo que não for dígito
        let formatado = '';
        let i = 0; // Índice para o valor (dígitos)
        let j = 0; // Índice para a máscara

        // 2. Itera sobre a máscara para formatar o valor
        while (i < valor.length && j < mascara.length) {
            if (mascara[j] === '#') {
                formatado += valor[i];
                i++;
            } else {
                // Se o caractere da máscara não for um '#', ele é um separador (., -, (, ), espaço)
                formatado += mascara[j];
            }
            j++;
        }
        
        input.value = formatado;
    }

    // 1. MÁSCARA DE CPF: ###.###.###-## (Formato: 14 caracteres)
    if (inputCPF) {
        inputCPF.addEventListener('input', function() {
            aplicarMascara(this, '###.###.###-##');
        });
    }

    // 2. MÁSCARA DE TELEFONE: (##) #####-#### (Formato: 15 caracteres)
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function() {
            // Verifica o tamanho para decidir entre (XX) XXXX-XXXX (fixo) ou (XX) XXXXX-XXXX (móvel)
            let tamanho = this.value.replace(/\D/g, '').length;
            let mascara = (tamanho <= 10) ? '(##) ####-####' : '(##) #####-####';
            aplicarMascara(this, mascara);
        });
    }

    // 3. MÁSCARA DE CEP: #####-### (Formato: 9 caracteres)
    if (inputCEP) {
        inputCEP.addEventListener('input', function() {
            aplicarMascara(this, '#####-###');
        });
    }


    /* ----------------------------------------------------------------- */
    /* INTERATIVIDADE ADICIONAL: Simulação de Envio de Formulário */
    /* ----------------------------------------------------------------- */
    const form = document.getElementById('form-cadastro');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real para que você possa testar

            // Validação simples (além da nativa do HTML5)
            if (inputCPF.value.length < 14) {
                 alert("ERRO: Preencha o CPF corretamente.");
                 return;
            }

            // Simulação de Sucesso
            alert("Cadastro enviado com sucesso! (Função de envio simulada em main.js)");
            
            // Limpa o formulário (para demonstração)
            form.reset(); 
        });
    }
});