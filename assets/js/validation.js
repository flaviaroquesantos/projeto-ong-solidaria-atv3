// assets/js/validation.js

// Torna a validação uma FUNÇÃO reutilizável no SPA
function initializeValidation() {

    const form = document.getElementById("form-cadastro");
    if (!form) {
        console.warn("validation.js: formulário não encontrado — talvez a página ainda não foi carregada.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // impede o envio até validar

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
                erro.textContent = `O campo "${campo.previousElementSibling.textContent.replace(':', '')}" é obrigatório.`;

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
    });

    console.log("Validação do formulário carregada com sucesso.");
}

// Exporta para o SPA chamar após carregar a página
export { initializeValidation };
