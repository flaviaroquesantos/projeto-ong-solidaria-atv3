// assets/js/validation.js

function handleValidation(event) {
    // 1. CRÍTICO: IMPEDE O ENVIO PADRÃO DO FORMULÁRIO (resolve o erro 405)
    event.preventDefault(); 
    
    // Procura pelo ID correto: 'form-cadastro'
    const form = document.getElementById("form-cadastro");
    if (!form) {
        console.error("Erro de Validação: O formulário 'form-cadastro' não foi encontrado.");
        return;
    }

    let formularioValido = true;

    // 2. Remove mensagens de erro antigas e classes de erro
    form.querySelectorAll(".error-message").forEach(msg => msg.remove());
    form.querySelectorAll("input.input-error").forEach(input => input.classList.remove("input-error"));

    // 3. Valida campos obrigatórios
    const camposObrigatorios = form.querySelectorAll("input[required]");

    camposObrigatorios.forEach((campo) => {
        
        // Validação de campo vazio
        if (!campo.value.trim()) {
            formularioValido = false;
            campo.classList.add("input-error"); 

            const erro = document.createElement("span");
            erro.classList.add("error-message");
            
            const labelText = campo.previousElementSibling ? campo.previousElementSibling.textContent.replace(':', '') : 'Campo';
            erro.textContent = `O campo "${labelText.trim()}" é obrigatório.`;

            // Insere a mensagem de erro APÓS o campo (dentro do .input-group)
            campo.parentNode.insertBefore(erro, campo.nextSibling);
        }
        // 4. Validação de E-mail (exemplo)
        else if (campo.type === 'email' && !/\S+@\S+\.\S+/.test(campo.value)) {
            formularioValido = false;
            campo.classList.add("input-error");
            
            const erro = document.createElement("span");
            erro.classList.add("error-message");
            erro.textContent = `Por favor, insira um e-mail válido.`;
            
            campo.parentNode.insertBefore(erro, campo.nextSibling);
        }
    });

    // 5. Ação final
    if (formularioValido) {
        alert("✅ Cadastro realizado com sucesso!");
        form.reset();
    } else {
        const primeiroErro = form.querySelector(".input-error");
        if (primeiroErro) {
            primeiroErro.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}


// Função para exportar e ser chamada pelo SPA (main.js)
function initValidation() {
    const form = document.getElementById("form-cadastro");
    if (!form) {
        console.warn("validation.js: Formulário 'form-cadastro' não encontrado para inicialização.");
        return;
    }
    
    form.addEventListener("submit", handleValidation);

    console.log("Validação do formulário carregada e ativa.");
}

export { initValidation };