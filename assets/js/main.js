document.addEventListener('DOMContentLoaded', function () {

    // ======== FUNÇÃO SPA (Single Page Application) ========
    const mainContainer = document.getElementById("spa-content");
    const navLinks = document.querySelectorAll("a[data-page]");

    if (navLinks.length > 0 && mainContainer) {
        navLinks.forEach(link => {
            link.addEventListener("click", async (e) => {
                e.preventDefault();
                const page = link.getAttribute("data-page");
                await carregarPagina(page);
            });
        });
    }

    async function carregarPagina(pagina) {
        try {
            const response = await fetch(`${pagina}.html`);
            if (!response.ok) throw new Error("Página não encontrada");

            const html = await response.text();
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            // Pega apenas o conteúdo dentro do <main> da página carregada
            const novoConteudo = tempDiv.querySelector("main")?.innerHTML;

            if (novoConteudo) {
                mainContainer.innerHTML = novoConteudo;

                // Atualiza título da aba
                document.title = `Impacta+ | ${pagina.charAt(0).toUpperCase() + pagina.slice(1)}`;

                // Reexecuta scripts da nova página (se existirem)
                const novosScripts = tempDiv.querySelectorAll("script");
                novosScripts.forEach(oldScript => {
                    const newScript = document.createElement("script");
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            } else {
                mainContainer.innerHTML = "<p>Erro: estrutura da página inválida.</p>";
            }

        } catch (error) {
            console.error("Erro ao carregar página:", error);
            mainContainer.innerHTML = `<p style="color:red;">Erro ao carregar ${pagina}.html</p>`;
        }
    }

});
