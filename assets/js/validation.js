// assets/js/validation.js

// Este Array simula um banco de dados temporário para salvar dados.
const dadosCadastrados = []; 

function handleValidation(event) {
    // 1. CRÍTICO: IMPEDE O ENVIO PADRÃO DO FORMULÁRIO (resolve o erro 405)
    event.preventDefault(); 
    
    // Procura o formulário dentro do escopo da função
    const form = document.getElementById("form-cadastro");
    if (!form) {
        console.error("Validação: Formulário 'form-cadastro' não encontrado na DOM.");
        return;
    }

    let formularioValido = true;

    // 2. Limpeza: Remove mensagens de erro antigas e classes de erro
    form.querySelectorAll(".error-message").forEach(msg => msg.remove());
    form.querySelectorAll("input.input-error").forEach(input => input.classList.remove("input-error"));

    // 3. Validação de campos obrigatórios
    const camposObrigatorios = form.querySelectorAll("input[required]");
    const novosDados = {};

    camposObrigatorios.forEach((campo) => {
        
        // 3.1. Validação de campo vazio
        if (!campo.value.trim()) {
            formularioValido = false;
            campo.classList.add("input-error"); 

            const erro = document.createElement("span");
            erro.classList.add("error-message");
            
            const labelText = campo.previousElementSibling ? campo.previousElementSibling.textContent.replace(':', '') : 'Campo';
            erro.textContent = `O campo "${labelText.trim()}" é obrigatório.`;

            // Insere a mensagem de erro APÓS o campo
            campo.parentNode.insertBefore(erro, campo.nextSibling);
        }
        // 3.2. Validação de E-mail
        else if (campo.type === 'email' && !/\S+@\S+\.\S+/.test(campo.value)) {
            formularioValido = false;
            campo.classList.add("input-error");
            
            const erro = document.createElement("span");
            erro.classList.add("error-message");
            erro.textContent = `Por favor, insira um e-mail válido.`;
            
            campo.parentNode.insertBefore(erro, campo.nextSibling);
        }
        
        // 4. Se o campo for válido, salva os dados
        if (campo.name) {
            novosDados[campo.name] = campo.value.trim();
        }
    });

    // 5. Ação final
    if (formularioValido) {
        // Salva os dados e exibe a lista atualizada
        dadosCadastrados.push(novosDados);
        renderizarVoluntarios();

        alert("✅ Cadastro realizado com sucesso!");
        form.reset();
    } else {
        const primeiroErro = form.querySelector(".input-error");
        if (primeiroErro) {
            primeiroErro.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}

function renderizarVoluntarios() {
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
    
    listaVoluntariosDiv.innerHTML = '<h3>Lista Atualizada:</h3>';
    listaVoluntariosDiv.appendChild(ul);
}


// Função PRINCIPAL para o SPA chamar
function initValidation() {
    const form = document.getElementById("form-cadastro");
    if (!form) {
        // Se o formulário não for encontrado, tente renderizar a lista
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