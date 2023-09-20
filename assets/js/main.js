const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const buttonSearch = document.querySelector('.button');

const maxRecords = 151
const limit = 12;
let offset = 0;

/* Take the html and transform it into javascript */

function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemonCard" class="pokemon ${pokemon.type}">
            <div class="frontCard">

                    <img class="photoPokemon" src="${pokemon.photo}"
                    alt="${pokemon.name}">
                    <span class="number"> N°${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </div>

                <div class="backCard">
                    <span class="number"> N°${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <h3 class="data_pokemon">Data Information</h3>
    
                    <ul class="info_pokemon">
                        <li class="data_pokemon">Height: ${pokemon.height} cm</li>
                        <li class="data_pokemon">Weight: ${pokemon.weight} kg</li>
                        ${pokemon.abilities.map((ability) => `<li class="data_pokemon">Abilitie: ${ability}</li>`).join('')}
                        <li class="data_pokemon">Base Experience: ${pokemon.base_experience}</li>
                    </ul>

                    <h3 class="data_pokemon">Base Stats</h3>

                    <ul class="info_pokemon">
                        <li class="data_pokemon">Health: ${pokemon.stats[0]}</span></li>
                        <li class="data_pokemon">Attack: ${pokemon.stats[1]}</li>
                        <li class="data_pokemon">Defense: ${pokemon.stats[2]}</li>
                        <li class="data_pokemon">Sp. Att: ${pokemon.stats[3]}</li>
                        <li class="data_pokemon">Sp. Def: ${pokemon.stats[4]}</li>
                        <li class="data_pokemon">Speed: ${pokemon.stats[5]}</li>
                    </ul>
                 </div>
        </li>
    `
}

/* Button for search */

buttonSearch.addEventListener('click', () => {
    const search = document.querySelector('.search_pokemon');
    const pokemon = document.querySelectorAll('.pokemon');
    const searchText = search.value.toLowerCase();

    pokemon.forEach(function (textPokemon) {
        let text = textPokemon.textContent.toLowerCase();
    
        for(let i = 0; i < text.length; i++){
            if (text.includes(searchText)) {
                textPokemon.style.display = "flex";
            } else {
                textPokemon.style.display = "none"
            }
    }
    })

})

/* Update pokemons in html */

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

/* Button to search for more pokemons */

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const nextPage = offset + limit

    if (nextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})