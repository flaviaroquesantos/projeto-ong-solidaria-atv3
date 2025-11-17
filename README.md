# 🚀 Projeto ONG Solidária (Atividade 3)

Este projeto simula o site de uma ONG e foi desenvolvido com foco em aprimorar habilidades em **JavaScript moderno (ES6 Modules, Fetch API)** e arquitetura de **Single Page Application (SPA)**, além de aplicar técnicas avançadas de layout com **CSS Grid** e validação de formulários.

## 🌟 Visão Geral e Funcionalidades

O objetivo principal desta versão é implementar o roteamento dinâmico (SPA) e garantir a validação robusta do formulário de cadastro, melhorando a experiência do usuário.

### Principais Recursos

* **Single Page Application (SPA):** Navegação fluida entre `home`, `projetos` e `cadastro` sem recarregar a página, utilizando o roteamento baseado em Hash (`#/`).
* **Importação Dinâmica de Módulos:** O JavaScript carrega os módulos (`validation.js`, `templates.js`) **apenas** quando a página correspondente (rota) é acessada, otimizando o carregamento inicial.
* **Validação de Formulário:** O formulário de cadastro possui validação de campos obrigatórios e formato (e-mail), exibindo mensagens de erro e bordas vermelhas (estilos `.input-error`) dinamicamente.
* **Layout Otimizado:** Uso de **CSS Grid** para criar um layout de 2 colunas no formulário de cadastro, melhorando a organização e centralização dos campos.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **HTML5** | Estrutura semântica e acessível. |
| **CSS3** | Estilização, layout responsivo e uso de **CSS Grid**. |
| **JavaScript (ES6+)** | Lógica de SPA, manipulação da DOM, `fetch` e **Módulos ES6** (`import`). |

---

## 📁 Estrutura de Arquivos

A organização do projeto segue o padrão de separação de responsabilidades:

PROJETO-ONG-SOLIDARIA-ATV3/ ├── assets/ │ ├── css/ │ │ ├── style.css # Estilos gerais, Layout Grid e regras de validação. │ │ └── variables.css # Variáveis CSS. │ └── js/ │ ├── main.js # O ROTEADOR SPA (Lógica principal). │ ├── templates.js # Lógica para renderizar projetos. │ └── validation.js # MÓDULO: Lógica de validação do formulário de cadastro. ├── cadastro.html # Conteúdo da página de cadastro (<main>). ├── home.html # Conteúdo da página inicial (<main>). ├── index.html # Arquivo base (carrega apenas main.js). └── projetos.html # Conteúdo da página de projetos (<main>).].

---

## 📝 Como Usar o Projeto (Rodando Localmente)

1.  **Clone o repositório.**
2.  **Abra o arquivo `index.html`** em seu navegador.
3.  **Navegue** pelas rotas (`#/projetos`, `#/cadastro`).

### Ponto de Atenção (GitHub Pages)

O arquivo `assets/js/main.js` foi configurado com um caminho absoluto (`/projeto-ong-solidaria-atv3/assets/js/validation.js`) para garantir que a importação dinâmica funcione corretamente no ambiente do GitHub Pages, resolvendo o erro `404 Not Found` que ocorria devido à subpasta do projeto. Se você hospedar em outro lugar, pode ser necessário ajustar o caminho de importação.
