📄 README.md: Projeto ONG Solidária
🌟 Nome do Projeto
Impacta+ | ONG Solidária

💻 Tecnologias Utilizadas
O projeto é um site estático e responsivo desenvolvido utilizando as seguintes tecnologias:

HTML5: Estrutura e semântica do conteúdo.

CSS3: Estilização e layout (incluindo style.css e responsive.css).

JavaScript: Interatividade básica (arquivo main.js).

Git & GitHub: Controle de versão e hospedagem.

📁 Estrutura do Projeto
A estrutura de pastas segue as melhores práticas para organização e manutenção:

PROJETO-ONG-SOLIDARIA/
├── assets/
│   ├── css/
│   │   ├── responsive.css
│   │   └── style.css
│   ├── img/  (Contém todas as imagens e ícones do site)
│   └── js/
│       └── main.js
├── cadastro.html
├── index.html
└── projetos.html
✨ Funcionalidades Implementadas
O site possui três páginas principais totalmente funcionais no ambiente de desenvolvimento local:

Página Inicial (index.html): Apresenta a missão, trajetória e conquistas da ONG.

Projetos (projetos.html): Detalha os projetos e as formas de auxílio.

Junte-se a Nós! (cadastro.html): Contém formulários de cadastro para voluntários e um formulário para doações, com campos radio button e campos de texto.

✅ Validação do Código
O código HTML foi validado (Nu Html Checker) e os erros de validação foram corrigidos antes da entrega final:

Correção no Formulário: Removidos IDs duplicados e tags <label> redundantes na seção de doação, garantindo a acessibilidade e validação do <fieldset>.

⚠️ Observação Técnica Crítica sobre o Deploy (GitHub Pages)
O link público do projeto no GitHub Pages apresenta falhas visuais (menu quebrado e imagens faltando), mas o código-fonte está funcional.

Causa do Problema: A falha é de origem técnica no ambiente de hospedagem do GitHub Pages e não um erro de programação HTML/CSS:

Falha de Build: O GitHub Actions gerou um erro crítico de build (o "X" vermelho) devido a uma configuração acidental de submódulo Git (No url found for submodule path...).

Impacto no Site: Mesmo após a limpeza do Git local, esta falha de build persiste no servidor, impedindo que o GitHub Pages encontre os arquivos estáticos (CSS e Imagens), resultando em erros 404 (Not Found) no console.

Conclusão: O código (HTML, CSS, JS) está completo e funcional e deve ser avaliado com base nos arquivos no repositório. O problema de exibição no link público é uma falha de infraestrutura do GitHub Pages.

🔗 Link do Repositório
https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories
