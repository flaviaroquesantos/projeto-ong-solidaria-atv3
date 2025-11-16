// assets/js/main.js

/**
 * MÓDULO PRINCIPAL DO SPA: Roteador baseado em Hash (método avançado com fetch)
 */

// Usamos window.onload (ou DOMContentLoaded) para garantir que o container existe
document.addEventListener("DOMContentLoaded", () => {
    
    const mainContainer = document.getElementById("spa-content");

    // ----------------------------------------------------
    // REMOÇÃO DA LÓGICA navLinks/data-page
    // O sistema agora depende apenas do evento hashchange e do hash inicial.
    // ----------------------------------------------------
    
    // Botão VOLTAR/AVANÇAR do navegador e links SPA (ouvindo o hash)
    // Usamos o 'hashchange' para pegar a mudança de rota (ex: de #/index para #/cadastro)
    window.addEventListener("hashchange", () => {
        const page = location.hash.replace("#/", "") || "index";
        carregarPagina(page);
    });

    /**
     * FUNÇÃO PRINCIPAL DO SPA
     */
    async function carregarPagina(pagina) {
        
        // Mapeia a rota para o nome do arquivo. Rotas vazias ou '/' viram 'index.html'.
        const arquivo = pagina === "" || pagina === "index"
            ? "index.html"
            : `${pagina}.html`;

        try {
            const response = await fetch(arquivo);

            if (!response.ok) throw new Error(`Página "${arquivo}" não encontrada. Status: ${response.status}`);

            const html = await response.text();
            const temp = document.createElement("div");
            
            // CRÍTICO: Se você está usando o fetch, o HTML retornado PRECISA 
            // ter a tag <main> com o conteúdo da página, como se fosse um arquivo HTML completo.
            temp.innerHTML = html;

            // Pega APENAS o conteúdo do MAIN
            const novoConteudo = temp.querySelector("main");

            if (!novoConteudo) {
                // Se o arquivo HTML não contiver a tag <main>, o roteador falha.
                mainContainer.innerHTML = "<p>Erro: Arquivo HTML retornado não contém o conteúdo dentro de uma tag &lt;main&gt;.</p>";
                return;
            }

            // Substitui o conteúdo atual pelo novo
            // Importante: Manter o <div class="container"> ao redor do mainContainer no index.html.
            mainContainer.innerHTML = novoConteudo.innerHTML;

            // Atualiza o título da aba
            document.title = `Impacta+ | ${pagina.charAt(0).toUpperCase() + pagina.slice(1)}`;

            // -------------------------------
            // 🔥 ATIVAR VALIDAÇÃO DO CADASTRO
            // -------------------------------
            if (pagina === "cadastro") {
                try {
                    const module = await import("./assets/js/validation.js");
                    
                    // CORREÇÃO: O nome da função de inicialização DEVE ser o exportado no validation.js
                    // Já que no código você usou module.initValidation(), mantive este nome.
                    module.initValidation(); 
                    
                } catch (e) {
                    console.error("ERRO CRÍTICO: Falha ao carregar ou executar validation.js.", e);
                    // Avisar o usuário se o script de validação falhar
                    mainContainer.insertAdjacentHTML('afterbegin', '<div style="color: red; text-align: center;">Erro: O sistema de validação falhou ao carregar.</div>');
                }
            }

            // O código de reexecução de scripts foi removido para evitar problemas de duplicação
            // A importação dinâmica acima já garante que o validation.js seja executado no momento certo.

        } catch (error) {
            console.error(error);
            mainContainer.innerHTML = `<p style="color:red;">Erro ao carregar a página: ${error.message}</p>`;
        }
    }

    // Carrega página inicial automaticamente, verificando a URL atual
    // Pega o hash e remove o '#' e o '/' inicial
    const paginaInicial = location.hash.replace(/^#\/?/, "") || "index";
    carregarPagina(paginaInicial);

});