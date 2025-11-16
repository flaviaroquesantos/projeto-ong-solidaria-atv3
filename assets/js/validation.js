// assets/js/validation.js

// Torna a validação uma FUNÇÃO reutilizável no SPA
// Renomeada para 'initValidation' para corresponder à chamada no main.js
function initValidation() { 

    const form = document.getElementById("form-cadastro");
    if (!form) {
        console.warn("validation.js: formulário não encontrado — talvez a página ainda não foi carregada.");
        return;
    }
    
    // CRÍTICO: Remove listeners antigos para evitar duplicação no SPA
    form.removeEventListener("submit", handleValidation);
    
    // Adiciona o novo listener, usando uma função separada para o handler
    form.addEventListener("submit", handleValidation);

    console.log("Validação do formulário carregada com sucesso.");
}

// Handler de validação separado para permitir o removeEventListener
function handleValidation(event) {
    event.preventDefault(); // CRÍTICO: IMPEDE O ENVIO PADRÃO (RESOLVE O ERRO 405)

    let formularioValido = true;

    // Remove mensagens de erro antigas
    form.querySelectorAll(".error-message").forEach(msg => msg.remove());
    form.querySelectorAll(".input-error").forEach(input => input.classList.remove("input-error"));

    const camposObrigatorios = form.querySelectorAll("input[required]");

    camposObrigatorios.forEach((campo) => {
        if (!campo.value.trim()) {
            formularioValido = false;

            campo.classList.add("input-error");

            const erro = document.createElement("span");
            erro.classList.add("error-message");
            // Acessa o label vizinho para o nome do campo
            erro.textContent = `O campo "${campo.previousElementSibling.textContent.replace(':', '')}" é obrigatório.`;

            campo.parentNode.appendChild(erro);
        }
        // Adiciona validação de e-mail (opcional, mas boa prática)
        else if (campo.type === 'email' && !/\S+@\S+\.\S+/.test(campo.value)) {
            formularioValido = false;
            campo.classList.add("input-error");
            const erro = document.createElement("span");
            erro.classList.add("error-message");
            erro.textContent = `Por favor, insira um e-mail válido.`;
            campo.parentNode.appendChild(erro);
        }
    });

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


// Exporta para o SPA chamar após carregar a página
export { initValidation };