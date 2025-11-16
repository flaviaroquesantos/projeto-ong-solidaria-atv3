// assets/js/validation.js

// Array para armazenar dados dos voluntários (simulando um "banco de dados" local)
const dadosCadastrados = []; 

function renderizarVoluntarios() {
    // Procura o local onde a lista será exibida (no seu cadastro.html)
    const listaVoluntariosDiv = document.getElementById("lista-voluntarios");
    if (!listaVoluntariosDiv) return;

    if (dadosCadastrados.length === 0) {
        listaVoluntariosDiv.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    const ul = document.createElement('ul');
    dadosCadastrados.forEach(voluntario => {
        const li = document.createElement('li');
        li.textContent = `${voluntario.nome} (${voluntario.email}) - Tel: ${voluntario.telefone}`;
        ul.appendChild(li);
    });
    
    listaVoluntariosDiv.innerHTML = '<h3>Voluntários Cadastrados:</h3>';
    listaVoluntariosDiv.appendChild(ul);
}


function handleValidation(event) {
    // CRÍTICO: IMPEDE O ENVIO PADRÃO DO FORMULÁRIO
    if (event) {
        event.preventDefault(); 
    }
    
    const form = document.getElementById("form-cadastro");
    if (!form) {
        // Se o formulário não for encontrado, não faça nada (ele já foi inicializado)
        return;
    }

    let formularioValido = true;

    // 1. Limpeza: Remove mensagens de erro e classes de erro
    form.querySelectorAll(".error-message").forEach(msg => msg.remove());
    form.querySelectorAll("input.input-error").forEach(input => input.classList.remove("input-error"));

    // 2. Validação de campos obrigatórios
    const camposObrigatorios = form.querySelectorAll("input[required]");
    const novosDados = {};

    camposObrigatorios.forEach((campo) => {
        
        // Validação de campo vazio
        if (!campo.value.trim()) {
            formularioValido = false;
            campo.classList.add("input-error"); 

            const erro = document.createElement("span");
            erro.classList.add("error-message");
            
            // Pega o nome do campo para a mensagem
            const labelText = campo.previousElementSibling ? campo.previousElementSibling.textContent.replace(':', '') : 'Campo';
            erro.textContent = `O campo "${labelText.trim()}" é obrigatório.`;

            // Insere a mensagem de erro APÓS o campo
            campo.parentNode.insertBefore(erro, campo.nextSibling);
        }
        // Validação de E-mail
        else if (campo.type === 'email' && !/\S+@\S+\.\S+/.test(campo.value)) {
            formularioValido = false;
            campo.classList.add("input-error");
            
            const erro = document.createElement("span");
            erro.classList.add("error-message");
            erro.textContent = `Por favor, insira um e-mail válido.`;
            
            campo.parentNode.insertBefore(erro, campo.nextSibling);
        }
        
        // Se o campo for válido, salva os dados
        if (campo.name) {
            novosDados[campo.name] = campo.value.trim();
        }
    });

    // 3. Ação final
    if (formularioValido) {
        // Salva os dados e atualiza a lista
        dadosCadastrados.push(novosDados);
        renderizarVoluntarios();

        alert("✅ Cadastro realizado com sucesso!");
        form.reset();
    } else {
        const primeiroErro = form.querySelector(".input-error");
        if (primeiroErro) {
            // Rola a tela para o primeiro erro
            primeiroErro.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}


// Função PRINCIPAL para o SPA chamar
function initValidation() {
    const form = document.getElementById("form-cadastro");
    if (!form) {
        renderizarVoluntarios();
        return;
    }
    
    // Adiciona o listener para o evento de envio (submit)
    form.addEventListener("submit", handleValidation);
    
    // Renderiza a lista inicial
    renderizarVoluntarios();

    console.log("Validação e controle de voluntários carregado e ativo.");
}

// Exporta a função para o main.js poder chamá-la
export { initValidation };