// Dados do Quiz e Produtos
const questions = [
  {
    title: "Quanto tempo você tem disponível para jogar?",
    options: [
      { text: "Pouco tempo (até 30 min/dia)", tag: "short" },
      { text: "Moderado (1 a 2 horas)", tag: "medium" },
      { text: "Imersão total (sessões longas)", tag: "long" }
    ]
  },
  {
    title: "Qual estilo de experiência você busca hoje?",
    options: [
      { text: "Desafio e Adrenalina", tag: "action" },
      { text: "Desconectar e Relaxar", tag: "cozy" },
      { text: "Uma Boa História", tag: "story" }
    ]
  }
];

const products = {
  "short-action": { name: "Street Fighter 6", price: "R$ 249,00", platform: "PC / PS5 / Xbox" },
  "short-cozy": { name: "Unpacking", price: "R$ 37,99", platform: "PC / Switch" },
  "short-story": { name: "What Remains of Edith Finch", price: "R$ 49,00", platform: "PC / Consoles" },
  "medium-action": { name: "Hades II", price: "R$ 88,99", platform: "PC" },
  "medium-cozy": { name: "Stardew Valley", price: "R$ 27,99", platform: "PC / Switch / Mobile" },
  "medium-story": { name: "The Last of Us Part I", price: "R$ 249,90", platform: "PC / PS5" },
  "long-action": { name: "Elden Ring", price: "R$ 229,90", platform: "PC / Consoles" },
  "long-cozy": { name: "Animal Crossing: New Horizons", price: "R$ 299,00", platform: "Nintendo Switch" },
  "long-story": { name: "The Witcher 3: Wild Hunt", price: "R$ 79,99", platform: "PC / Consoles" }
};

let currentQuestion = 0;
let userTags = [];

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-title').innerText = q.title;
  
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn-option';
    btn.innerText = opt.text;
    btn.onclick = () => selectOption(opt.tag);
    container.appendChild(btn);
  });
}

function selectOption(tag) {
  userTags.push(tag);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('question-box').style.display = 'none';
  document.getElementById('result-box').style.display = 'block';

  // Cria a chave combinando as tags selecionadas (ex: "short-action")
  const key = userTags.join('-');
  const match = products[key] || { name: "Jogo Recomendado", price: "R$ 99,00", platform: "Todas" };

  document.getElementById('product-card').innerHTML = `
    <div class="product-card">
      <h3>${match.name}</h3>
      <p style="color: #a8a8b3;">Plataforma: ${match.platform}</p>
      <p class="product-price">${match.price}</p>
      <button class="buy-btn">Adicionar ao Carrinho</button>
    </div>
  `;
}

function resetQuiz() {
  currentQuestion = 0;
  userTags = [];
  document.getElementById('question-box').style.display = 'block';
  document.getElementById('result-box').style.display = 'none';
  renderQuestion();
}

// Inicializa o quiz ao carregar a página
renderQuestion();