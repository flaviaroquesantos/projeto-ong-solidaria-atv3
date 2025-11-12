// assets/js/validation.js
/**
 * MÓDULO DE VALIDAÇÃO DE FORMULÁRIO (cadastro.html)
 * Garante que campos obrigatórios sejam preenchidos antes do envio.
 */

// Seletor do formulário de cadastro (Ajuste o ID se for diferente no seu HTML)
// *Você informou que seu ID é 'form-cadastro' em uma mensagem anterior. Se for esse o caso,
// você deve trocar 'cadastro-form' por 'form-cadastro'. Vou manter o que você enviou, mas
// verifique essa linha em seu código se o JS não inicializar.*
const formCadastro = document.getElementById('cadastro-form'); 

// --- FUNÇÕES DE UTILIY (DOM) ---

// Adiciona a mensagem de erro no DOM
function displayError(inputElement, message) {
    // CORREÇÃO: Usando .input-group para coincidir com o HTML
    const formGroup = inputElement.closest('.input-group');
    
    // Se o elemento pai não for encontrado, a validação não funciona
    if (!formGroup) {
        console.error("Erro: Elemento pai .input-group não encontrado para o input:", inputElement);
        return;
    }
    
    // Remove qualquer mensagem de erro anterior
    let errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }

    // Cria e exibe o novo elemento de erro
    errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    
    inputElement.classList.add('input-error'); // Adiciona classe visual de erro
    formGroup.appendChild(errorElement);
}

// Limpa o erro do DOM
function clearError(inputElement) {
    // CORREÇÃO: Usando .input-group para coincidir com o HTML
    const formGroup = inputElement.closest('.input-group');
    const errorElement = formGroup ? formGroup.querySelector('.error-message') : null;
    
    inputElement.classList.remove('input-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// --- FUNÇÃO PRINCIPAL DE VALIDAÇÃO ---

function validateForm(event) {
    // Impede o envio padrão para que o JS possa verificar primeiro
    event.preventDefault(); 
    
    let isValid = true;
    
    // Simplesmente verifica se o campo "Nome" está preenchido
    const nomeInput = formCadastro.querySelector('#nome');
    if (nomeInput && nomeInput.value.trim() === '') {
        displayError(nomeInput, 'O campo Nome é obrigatório.');
        isValid = false;
    } else if (nomeInput) {
        clearError(nomeInput);
    }
    
    // EXEMPLO DE VALIDAÇÃO DE E-MAIL (Ajuste o ID do seu campo de e-mail)
    const emailInput = formCadastro.querySelector('#email');
    if (emailInput && (!emailInput.value.includes('@') || emailInput.value.trim() === '')) {
        displayError(emailInput, 'Por favor, insira um e-mail válido.');
        isValid = false;
    } else if (emailInput) {
        clearError(emailInput);
    }
    
    // Se tudo estiver válido, simula o envio e limpa o formulário
    if (isValid) {
        alert('Formulário enviado com sucesso! Agradecemos o interesse.');
        formCadastro.reset();
        // Aqui você faria o fetch para enviar os dados para o servidor real
    }
}

// Adiciona o listener para o evento de submit
if (formCadastro) {
    formCadastro.addEventListener('submit', validateForm);
}