document.addEventListener("DOMContentLoaded", () => {

    const mainContainer = document.getElementById("spa-content");
    const navLinks = document.querySelectorAll('a[data-page]');

    // Clique no menu → troca a página
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const page = link.getAttribute("data-page");

            if (!page) return;
            carregarPagina(page);

            // Atualiza histórico
            history.pushState({ page }, "", `#${page}`);
        });
    });

    // Botão VOLTAR/AVANÇAR do navegador
    window.addEventListener("popstate", (event) => {
        const page = event.state?.page || "index";
        carregarPagina(page);
    });

    /**
     * FUNÇÃO PRINCIPAL DO SPA
     */
    async function carregarPagina(pagina) {
        try {
            // Define nome do arquivo
            const arquivo = pagina === "index"
                ? "index.html"
                : `${pagina}.html`;

            const response = await fetch(arquivo);

            if (!response.ok) throw new Error(`Página "${arquivo}" não encontrada.`);

            const html = await response.text();
            const temp = document.createElement("div");
            temp.innerHTML = html;

            // Pega APENAS o conteúdo do MAIN
            const novoConteudo = temp.querySelector("main");

            if (!novoConteudo) {
                mainContainer.innerHTML = "<p>Erro: arquivo HTML sem <main>.</p>";
                return;
            }

            // Substitui o conteúdo atual pelo novo
            mainContainer.innerHTML = novoConteudo.innerHTML;

            // Atualiza o título da aba
            document.title = `Impacta+ | ${pagina.charAt(0).toUpperCase() + pagina.slice(1)}`;

            // Reexecuta scripts que vieram dentro do HTML carregado
            temp.querySelectorAll("script").forEach(old => {
                const newScript = document.createElement("script");
                if (old.src) newScript.src = old.src;
                else newScript.textContent = old.textContent;
                document.body.appendChild(newScript);
            });

            // -------------------------------
            // 🔥 CARREGAR TEMPLATES DINÂMICOS
            // -------------------------------
            if (pagina === "projetos" || pagina === "projetos") {
                try {
                    const module = await import("./assets/js/templates.js");
                    module.renderDynamicProjects();
                } catch (e) {
                    console.warn("templates.js não encontrado.");
                }
            }

            // -------------------------------
            // 🔥 ATIVAR VALIDAÇÃO DO CADASTRO
            // -------------------------------
            if (pagina === "cadastro") {
                try {
                    const module = await import("./assets/js/validation.js");
                    module.initializeValidation();
                } catch (e) {
                    console.warn("validation.js não encontrado.");
                }
            }

        } catch (error) {
            console.error(error);
            mainContainer.innerHTML = `<p style="color:red;">Erro ao carregar a página ${pagina}</p>`;
        }
    }

    // Carrega página inicial automaticamente
    const paginaInicial = location.hash.replace("#", "") || "index";
    carregarPagina(paginaInicial);

});
