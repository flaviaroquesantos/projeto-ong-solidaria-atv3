// assets/js/validation.js
/**
 * MÓDULO DE VALIDAÇÃO DE FORMULÁRIO (cadastro.html)
 * Garante que campos obrigatórios sejam preenchidos antes do envio.
 */

// Encapsula o código principal para garantir que o formulário exista antes de ser buscado.
document.addEventListener('DOMContentLoaded', function() {

    // Seletor do formulário de cadastro (agora garantido de existir no DOM)
    const formCadastro = document.getElementById('form-cadastro'); 

    // --- FUNÇÕES DE UTILIY (DOM) ---

    // Adiciona a mensagem de erro no DOM
    function displayError(inputElement, message) {
        const formGroup = inputElement.closest('.input-group');
        
        if (!formGroup) {
            console.error("Erro: Elemento pai .input-group não encontrado para o input:", inputElement);
            return;
        }
        
        let errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }

        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        inputElement.classList.add('input-error'); 
        formGroup.appendChild(errorElement);
    }

    // Limpa o erro do DOM
    function clearError(inputElement) {
        const formGroup = inputElement.closest('.input-group');
        const errorElement = formGroup ? formGroup.querySelector('.error-message') : null;
        
        inputElement.classList.remove('input-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // --- FUNÇÃO PRINCIPAL DE VALIDAÇÃO ---

    function validateForm(event) {
        event.preventDefault(); 
        
        let isValid = true;
        
        // Validação do Nome
        const nomeInput = formCadastro.querySelector('#nome');
        if (nomeInput && nomeInput.value.trim() === '') {
            displayError(nomeInput, 'O campo Nome é obrigatório.');
            isValid = false;
        } else if (nomeInput) {
            clearError(nomeInput);
        }
        
        // Validação do E-MAIL
        const emailInput = formCadastro.querySelector('#email');
        if (emailInput && (!emailInput.value.includes('@') || emailInput.value.trim() === '')) {
            displayError(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        } else if (emailInput) {
            clearError(emailInput);
        }
        
        if (isValid) {
            alert('Formulário enviado com sucesso! Agradecemos o interesse.');
            formCadastro.reset();
        }
    }

    // Adiciona o listener para o evento de submit (garantido de existir)
    if (formCadastro) {
        formCadastro.addEventListener('submit', validateForm);
    } else {
        console.error("Erro fatal: Não foi possível encontrar o formulário com ID 'form-cadastro'.");
    }
});