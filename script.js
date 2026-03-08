// LOGIN
function fazerLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "admin" && senha === "123") {
    localStorage.setItem("logado", "true");
    document.getElementById("login-container").style.display = "none";
    document.getElementById("sistema-container").style.display = "block";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

// SAIR
function logout() {
  localStorage.removeItem("logado");
  document.getElementById("sistema-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
}

// MOSTRAR ABAS
function mostrarAba(id) {
  document.querySelectorAll(".aba").forEach(a => a.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// CADASTRAR ALUNO
function cadastrarAluno() {
  const nome = nomeInput.value;
  const telefone = telefoneInput.value;
  const plano = planoSelect.value;
  const valor = valorInput.value;

  if (!nome || !telefone || !plano || !valor) {
    alert("Preencha todos os campos!");
    return;
  }

  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  alunos.push({
    id: alunos.length + 1,
    nome, telefone, plano, valor,
    status: "inadimplente"
  });
  localStorage.setItem("alunos", JSON.stringify(alunos));
  alert("Aluno cadastrado!");
  limparCadastro();
}

function limparCadastro() {
  nomeInput.value = "";
  telefoneInput.value = "";
  planoSelect.value = "";
  valorInput.value = "";
}

// LISTAR / EXCLUIR
function listarAlunos() {
  const lista = document.getElementById("listaAlunos");
  lista.innerHTML = "";
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  alunos.forEach(a => {
    const li = document.createElement("li");
    li.innerHTML = `${a.id} - ${a.nome} (${a.plano}) - ${a.status}
      <button onclick="excluirAluno(${a.id})">❌</button>`;
    lista.appendChild(li);
  });
}

function excluirAluno(id) {
  let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  alunos = alunos.filter(a => a.id !== id);
  localStorage.setItem("alunos", JSON.stringify(alunos));
  alert("Aluno excluído!");
  listarAlunos();
}

// PAGAMENTO
function registrarPagamento() {
  const id = parseInt(document.getElementById("idAluno").value);
  const valor = parseFloat(document.getElementById("valorPago").value);
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  const aluno = alunos.find(a => a.id === id);
  if (aluno) {
    aluno.status = "adimplente";
    localStorage.setItem("alunos", JSON.stringify(alunos));
    alert("Pagamento registrado!");
  } else {
    alert("Aluno não encontrado!");
  }
}

function excluirPagamento() {
  const id = parseInt(document.getElementById("idAluno").value);
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  const aluno = alunos.find(a => a.id === id);
  if (aluno) {
    aluno.status = "inadimplente";
    localStorage.setItem("alunos", JSON.stringify(alunos));
    alert("Pagamento removido!");
  } else {
    alert("Aluno não encontrado!");
  }
}

// RELATÓRIO
function gerarRelatorio(tipo) {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  let msg = "";
  if (tipo === "adimplente") msg = alunos.filter(a => a.status === "adimplente").map(a => a.nome).join(", ");
  else if (tipo === "inadimplente") msg = alunos.filter(a => a.status === "inadimplente").map(a => a.nome).join(", ");
  else msg = "Função de saldo em construção.";
  alert(msg || "Nenhum registro encontrado.");
}

// DESPESAS
function registrarDespesa() {
  const desc = document.getElementById("descricaoDespesa").value;
  const valor = parseFloat(document.getElementById("valorDespesa").value);
  if (!desc || isNaN(valor)) return alert("Preencha todos os campos!");

  const despesas = JSON.parse(localStorage.getItem("despesas")) || [];
  despesas.push({ desc, valor, data: new Date().toLocaleDateString() });
  localStorage.setItem("despesas", JSON.stringify(despesas));
  alert("Despesa registrada!");
}

function excluirDespesa() {
  let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
  despesas.pop();
  localStorage.setItem("despesas", JSON.stringify(despesas));
  alert("Última despesa excluída!");
}

// AUTOLOGIN
window.onload = function () {
  if (localStorage.getItem("logado") === "true") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("sistema-container").style.display = "block";
  }
};

// Referências de inputs
const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const planoSelect = document.getElementById("plano");
const valorInput = document.getElementById("valor");

