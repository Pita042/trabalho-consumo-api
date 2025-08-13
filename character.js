const content = document.getElementById('character-details');
const paginate = document.getElementById('paginate');
let id = Number(window.location.hash.replace("#", "")) || 1;

async function getCharacter() {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (response.ok) {
        const data = await response.json();

        content.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.image}" alt="${data.name}" width="200"/>
            <p><strong>Espécie:</strong> ${data.species}</p>
            <p><strong>Origem:</strong> ${data.origin.name}</p>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Gênero:</strong> ${data.gender}</p>
            <p><strong>Localização:</strong> ${data.location.name}</p>
        `;

        let prevButton = `<button id="prev" onclick="navigate(-1)" ${id <= 1 ? 'disabled' : ''}>Anterior</button>`;
        let nextButton = `<button id="next" onclick="navigate(1)" ${id >= 826 ? 'disabled' : ''}>Próximo</button>`;

        paginate.innerHTML = prevButton + nextButton;
    } else {
        content.innerHTML = `<p>Personagem não encontrado. Tente outro ID entre 1 e 826.</p>`;
    }
}

function navigate(direction) {
    const newId = id + direction;
    window.location.hash = `#${newId}`;
    id = newId;
    getCharacter();
}

getCharacter();
