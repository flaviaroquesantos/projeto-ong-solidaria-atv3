document.addEventListener('DOMContentLoaded', () => {

  // ========= MÁSCARAS =========
  const inputCPF = document.getElementById('cpf');
  const inputTelefone = document.getElementById('telefone');
  const inputCEP = document.getElementById('cep');
  const form = document.getElementById('form-cadastro');
  const listaContainer = document.getElementById('lista-voluntarios');

  function aplicarMascara(input, mascara) {
    let valor = input.value.replace(/\D/g, '');
    let formatado = '';
    let i = 0, j = 0;

    while (i < valor.length && j < mascara.length) {
      formatado += (mascara[j] === '#') ? valor[i++] : mascara[j];
      j++;
    }
    input.value = formatado;
  }

  if (inputCPF) {
    inputCPF.addEventListener('input', function() {
      aplicarMascara(this, '###.###.###-##');
    });
  }

  if (inputTelefone) {
    inputTelefone.addEventListener('input', function() {
      const tamanho = this.value.replace(/\D/g, '').length;
      const mascara = (tamanho <= 10) ? '(##) ####-####' : '(##) #####-####';
      aplicarMascara(this, mascara);
    });
  }

  if (inputCEP) {
    inputCEP.addEventListener('input', function() {
      aplicarMascara(this, '#####-###');
    });
  }

  // ========= LISTA DE VOLUNTÁRIOS =========
  function atualizarLista() {
    if (!listaContainer) return;

    const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];

    if (voluntarios.length === 0) {
      listaContainer.innerHTML = "<p>Nenhum voluntário cadastrado ainda.</p>";
      return;
    }

    listaContainer.innerHTML = voluntarios.map(v => `
      <div class="voluntario-card">
        <h4>${v.nome}</h4>
        <p><strong>Email:</strong> ${v.email}</p>
        <p><strong>Telefone:</strong> ${v.telefone}</p>
        <p><strong>CPF:</strong> ${v.cpf}</p>
        <p><strong>CEP:</strong> ${v.cep}</p>
      </div>
    `).join("");
  }

  // ========= CADASTRO =========
  if (form) {
    atualizarLista();

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const dados = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        cpf: document.getElementById('cpf').value.trim(),
        cep: document.getElementById('cep').value.trim(),
      };

      const camposVazios = Object.entries(dados).filter(([_, valor]) => valor === "");
      if (camposVazios.length > 0) {
        alert("Preencha todos os campos antes de enviar!");
        return;
      }

      if (dados.cpf.length < 14) {
        alert("ERRO: Preencha o CPF corretamente.");
        return;
      }

      const voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
      voluntarios.push(dados);
      localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

      alert("Cadastro enviado com sucesso!");
      form.reset();
      atualizarLista();
    });
  }

  // ========= SPA (Single Page Application) =========
  const mainContainer = document.getElementById("spa-content");
  const navLinks = document.querySelectorAll(".spa-link");

  if (mainContainer && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const destino = link.getAttribute("href").replace("#", "");
        carregarPagina(destino);
      });
    });

    async function carregarPagina(pagina) {
      try {
        const response = await fetch(`${pagina}.html`);
        if (!response.ok) throw new Error("Página não encontrada");

        const html = await response.text();
        mainContainer.innerHTML = html;

        // Recarrega scripts da nova página
        const scripts = mainContainer.querySelectorAll("script");
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
          oldScript.remove();
        });

        // Atualiza o título da aba
        document.title = `Impacta+ | ${pagina.charAt(0).toUpperCase() + pagina.slice(1)}`;

      } catch (err) {
        mainContainer.innerHTML = `<p style="color:red;">Erro ao carregar <b>${pagina}.html</b>.</p>`;
        console.error("Erro no carregamento do SPA:", err);
      }
    }

    // Página inicial padrão
    carregarPagina("index");
  }

});
