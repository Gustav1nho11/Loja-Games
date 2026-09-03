const games = [
  { id: 1, title: 'Elden Ring', plataforma: 'PS5', genero: 'RPG', price: 'R$ 249,00' },
  { id: 2, title: 'Cyberpunk 2077', plataforma: 'PC', genero: 'RPG', price: 'R$ 199,00' },
  { id: 3, title: 'Hollow Knight', plataforma: 'PC', genero: 'Indie', price: 'R$ 46,99' },
  { id: 4, title: 'Zelda: Tears of the Kingdom', plataforma: 'Switch', genero: 'Ação', price: 'R$ 349,00' },
  { id: 5, title: 'God of War Ragnarök', plataforma: 'PS5', genero: 'Ação', price: 'R$ 299,00' }
];

const checkboxes = document.querySelectorAll('.filter-check');
const activeTagsContainer = document.getElementById('active-tags');
const clearAllBtn = document.getElementById('clear-all');
const gamesGrid = document.getElementById('games-grid');
const gameCount = document.getElementById('game-count');

function update() {
  const activeFilters = Array.from(checkboxes)
    .filter(input => input.checked)
    .map(input => ({ type: input.dataset.type, value: input.value, element: input }));

  renderTags(activeFilters);
  renderGames(activeFilters);
}

function renderTags(filters) {
  activeTagsContainer.innerHTML = '';
  clearAllBtn.style.display = filters.length > 0 ? 'inline-block' : 'none';

  filters.forEach(filter => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${filter.type}: ${filter.value} <button>&times;</button>`;
    
    tag.querySelector('button').addEventListener('click', () => {
      filter.element.checked = false;
      update();
    });

    activeTagsContainer.appendChild(tag);
  });
}

function renderGames(filters) {
  const filteredGames = games.filter(game => {
    if (filters.length === 0) return true;
    return filters.some(f => game[f.type] === f.value);
  });

  gameCount.textContent = filteredGames.length;
  
  if (filteredGames.length === 0) {
    gamesGrid.innerHTML = '<p style="grid-column: 1/-1; color: #a8a8b3;">Nenhum jogo encontrado com os filtros selecionados.</p>';
    return;
  }

  gamesGrid.innerHTML = filteredGames.map(game => `
    <div class="card">
      <h4>${game.title}</h4>
      <p>Plataforma: ${game.plataforma}</p>
      <p>Gênero: ${game.genero}</p>
      <div class="price">${game.price}</div>
    </div>
  `).join('');
}

checkboxes.forEach(input => input.addEventListener('change', update));

clearAllBtn.addEventListener('click', () => {
  checkboxes.forEach(input => input.checked = false);
  update();
});

update();
