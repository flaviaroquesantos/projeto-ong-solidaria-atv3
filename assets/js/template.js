// assets/js/templates.js
/**
 * MÓDULO DE TEMPLATES JS
 * Cria uma função para renderizar dinamicamente o conteúdo de projetos.
 */

// Dados simulados de um projeto (poderia vir de uma API)
const projectData = {
    id: 3,
    title: "Oficina de Jardinagem Comunitária",
    description: "Incentivo à sustentabilidade e criação de hortas em espaços públicos para famílias.",
    impact: 80,
    meta: "80% da meta de insumos atingida"
};

// Função de Template: Retorna a string HTML com base nos dados
function createProjectCardTemplate(data) {
    return `
        <article class="projeto-item">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="indicadores">
                <p>🌱 **Pessoas Impactadas:** ${data.impact}</p>
                <p>🎯 **Progresso:** ${data.meta}</p>
            </div>
            <a href="#" class="cta-button">Apoie este Projeto</a>
        </article>
    `;
}

// Função para injetar o template em um local específico do DOM
function renderDynamicProjects() {
    // Local onde você quer injetar o novo projeto (Ajuste o ID se necessário)
    const projectListContainer = document.getElementById('projetos-sociais'); 

    if (projectListContainer) {
        const newCardHTML = createProjectCardTemplate(projectData);
        // Adiciona o novo card dinamicamente no início da lista
        projectListContainer.insertAdjacentHTML('beforeend', newCardHTML); 
        console.log("Projeto dinâmico injetado com sucesso.");
    }
}

// Exporta as funções para serem usadas no main.js
export { renderDynamicProjects };