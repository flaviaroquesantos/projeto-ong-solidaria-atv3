// assets/js/main.js

/**
 * MÓDULO PRINCIPAL DO SPA: Roteador baseado em Hash (método avançado com fetch)
 */

// Elemento principal onde o conteúdo será injetado
const mainContainer = document.getElementById("spa-content");

/**
 * FUNÇÃO PRINCIPAL DO SPA: Carrega o conteúdo de uma página.
 * @param {string} pagina - O nome da página/rota (ex: 'cadastro', 'projetos').
 */
async function carregarPagina(pagina) {
    
    // Mapeia a rota para o nome do arquivo. Rotas vazias ou '/' viram 'index.html'.
    const arquivo = pagina === "" || pagina === "index"
        ? "index.html"
        : `${pagina}.html`;

    try {
        const response = await fetch(arquivo);

        if (!response.ok) {
             throw new Error(`Página "${arquivo}" não encontrada. Status: ${response.status}`);
        }

        const html = await response.text();
        const temp = document.createElement("div");
        temp.innerHTML = html;

        // Pega APENAS o conteúdo do MAIN
        // CRÍTICO: O arquivo HTML retornado deve ter a tag <main> com o conteúdo da página.
        const novoConteudo = temp.querySelector("main");

        if (!novoConteudo) {
            mainContainer.innerHTML = "<p>Erro: O arquivo HTML retornado não contém o conteúdo dentro de uma tag &lt;main&gt;.</p>";
            return;
        }

        // 1. Substitui o conteúdo atual pelo novo
        mainContainer.innerHTML = novoConteudo.innerHTML;

        // 2. Atualiza o título da aba
        const tituloFormatado = pagina.charAt(0).toUpperCase() + pagina.slice(1);
        document.title = `Impacta+ | ${tituloFormatado}`;

        // -------------------------------
        // 3. 🔥 ATIVAR VALIDAÇÃO DO CADASTRO
        // -------------------------------
        if (pagina === "cadastro") {
            try {
                // Importação dinâmica do módulo de validação
                if (pagina === "cadastro") {
            try {
                // Tenta importar usando o caminho do repositório (CRÍTICO para GitHub Pages)
                const module = await import("/projeto-ong-solidaria-atv3/assets/js/validation.js");
                module.initValidation(); 
            } catch (e) {
                console.error("ERRO CRÍTICO: Falha ao carregar ou executar validation.js.", e);
            }
        }
                module.initValidation(); // Chama a função corrigida
            } catch (e) {
                console.error("ERRO CRÍTICO: Falha ao carregar ou executar validation.js.", e);
            }
        }
        
        // -------------------------------
        // 4. 🔥 ATIVAR RENDERIZAÇÃO DE PROJETOS (se necessário)
        // -------------------------------
        if (pagina === "projetos") {
            try {
                const module = await import("./assets/js/templates.js");
                // Verifica se a função existe no módulo importado
                if (module.renderDynamicProjects) {
                    module.renderDynamicProjects(); 
                }
            } catch (e) {
                console.warn("Falha ao carregar templates.js para renderização de projetos.", e);
            }
        }


    } catch (error) {
        console.error(error);
        mainContainer.innerHTML = `<p style="color:red;">Erro ao carregar a página: ${error.message}</p>`;
    }
}

// ----------------------------------------------------
// LÓGICA DE ATIVAÇÃO DO SPA
// ----------------------------------------------------

// 1. Ouve mudanças no hash (cliques nos links de navegação: #/projetos, #/cadastro)
window.addEventListener("hashchange", () => {
    // Remove o '#' e a barra inicial (/)
    const page = location.hash.replace(/^#\/?/, "") || "index";
    carregarPagina(page);
});

// 2. Carrega a página inicial ou a rota da URL quando o DOM está pronto
window.addEventListener("DOMContentLoaded", () => {
    // Pega o hash e remove o '#' e o '/' inicial
    const paginaInicial = location.hash.replace(/^#\/?/, "") || "index";
    carregarPagina(paginaInicial);
});