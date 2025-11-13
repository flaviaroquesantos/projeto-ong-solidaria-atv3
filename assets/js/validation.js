// assets/js/validation.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-cadastro");

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

                // adiciona classe de erro no input
                campo.classList.add("input-error");

                // cria mensagem de erro
                const erro = document.createElement("span");
                erro.classList.add("error-message");
                erro.textContent = `O campo "${campo.previousElementSibling.textContent.replace(':', '')}" é obrigatório.`;

                // adiciona a mensagem logo abaixo do campo
                campo.parentNode.appendChild(erro);
            }
        });

        if (formularioValido) {
            // Tudo certo — simula envio
            alert("✅ Cadastro realizado com sucesso!");
            form.reset();
        } else {
            // rola até o primeiro erro
            const primeiroErro = form.querySelector(".input-error");
            if (primeiroErro) {
                primeiroErro.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
});
