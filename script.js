const games = [
  { 
    id: 1, 
    title: 'Elden Ring', 
    plataforma: 'PS5', 
    genero: 'RPG', 
    price: 'R$ 249,00',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8f8XsY_dPgkrJxM2eOhOvA_1Mk0OvZJCJ5AbDXeh2w&s=10' 
  },
  { 
    id: 2, 
    title: 'Cyberpunk 2077', 
    plataforma: 'PC', 
    genero: 'RPG', 
    price: 'R$ 199,00',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnNfLfVXP5yFpVfP0t6fVHrvCHi6PNCxm3HeZZq8cLw&s=10' 
  },
  { 
    id: 3, 
    title: 'Hollow Knight', 
    plataforma: 'PC', 
    genero: 'Indie', 
    price: 'R$ 46,99',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBM27fdmn1PKxuGaneuQ8CDxuUAC_75MqJFA-TlCYcnw&s=10' 
  },
  { 
    id: 4, 
    title: 'Zelda: Tears of the Kingdom', 
    plataforma: 'Switch', 
    genero: 'Ação', 
    price: 'R$ 349,00',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQW4rRPAMpLZlZhBOVohZYQT9E8YGLxn2zKunONYKCyA&s' 
  },
  { 
    id: 5, 
    title: 'God of War Ragnarök', 
    plataforma: 'PS5', 
    genero: 'Ação', 
    price: 'R$ 299,00',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgku4SxrbkSNKW_HscO1gIXRToGruEiZvOt00G1dbLzw&s=10' 
  }
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
      <img src="${game.cover}" alt="${game.title}" class="cover">
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
