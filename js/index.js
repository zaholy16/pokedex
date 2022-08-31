"use strict"

let d = document;
let container = d.querySelector('.container');

const urlBase = "https://pokeapi.co/api/v2/"

const getIDPokemon = async (id) => {
    const response = await fetch(urlBase + `pokemon/${id} `)
    const data = await response.json()
    console.log(data)
    drawPokemon(data)
}

const getPokemons = async (number) => {

    for(let i=1; i<=number; i++){
        getIDPokemon(i)
    }
}

getPokemons(20);

const drawPokemon = (pokemon) => {
    
    let card = d.createElement('div')
    card.classList.add('card')

    let leftColumn = d.createElement('div')
    leftColumn.classList.add('left-column', 'background1-left-column')
    leftColumn.innerHTML = ` 
        <h2>#${pokemon.id.toString().padStart(3,0)}</h2>
        <h3 id="name-pokemon">${pokemon.name}</h3>`

    let rightColumn = d.createElement('div')
    rightColumn.classList.add('right-column')
    rightColumn.innerHTML = `
        <img id="image" src="${pokemon.sprites.front_default}" alt="">
                
        <div class="abilities">
            <h4>Abilities: </h4>
        </div>
        
        <h4 id="weight">Weight: <i>${pokemon.weight}</i></h4>
    `

    card.appendChild(leftColumn)
    card.appendChild(rightColumn)
    container.append(card)
}



