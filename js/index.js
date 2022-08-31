"use strict"

const container = document.querySelector('.container');
const btnPages = document.querySelector('.btnPages');
const select = document.querySelector('#select')
let btnNext, btnPrevious;
let abilities = [];
let types = [];
let slot = '';
let abilityString = '';

const urlPokemon = "https://pokeapi.co/api/v2";

const getPokemons = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        dataPokemons(data.results);
        pagination(data.next, data.previous)
    } catch (error) {
        console.log(error);
    }
}

getPokemons(urlPokemon + `/pokemon`);

const dataPokemons = async (data) => {
    container.innerHTML = ''; //Clear data
    try {
        for (const index of data) {
            const response = await fetch(index.url);
            const results = await response.json();

            abilities = results.abilities;
            types = results.types;
        
           drawCard(results.id, results.name.toUpperCase(), results.sprites.other.dream_world.front_default, types, abilities, results.weight)

        }

    } catch (error) {
        console.log(error);
    }
}

const drawCard = (id, name, image, types, abilities, weight) => {

    let card = document.createElement('div')
    card.classList.add('card')

    let leftColumn = document.createElement('div')
    leftColumn.classList.add('left-column', 'background')
    leftColumn.innerHTML = ` 
    <h2>#${id.toString().padStart(3,0)}</h2>
    <h3>${name}</h3>`

    let containerTypes = document.createElement('div');
    containerTypes.classList.add('types');
 
    types.forEach(index => {
        let imgTypes = document.createElement('img');
        imgTypes.classList.add('imgType')
        imgTypes.setAttribute('src', `./img/Pokémon_${index.type.name}.png`)
        containerTypes.append(imgTypes);
        leftColumn.append(containerTypes);
    });

    let rightColumn = document.createElement('div')
    rightColumn.classList.add('right-column')
    rightColumn.innerHTML = `
    <img src="${image}" alt="">
            
    <div class="containerWeight">
        <img class="weight" src="./img/weight.svg" />
        <h4 id="weight"><i>${weight}</i></h4>
    </div>`

    let containerAbility = document.createElement('div')
    containerAbility.classList.add('abilities');
    
    abilities.forEach(index => {
        console.log(index.ability.name)
        let containerAbility = document.createElement('div')
        containerAbility.classList.add('abilities');
        containerAbility.innerText = index.ability.name;
        rightColumn.append(containerAbility);
    });
    

    card.appendChild(leftColumn)
    card.appendChild(rightColumn)
    container.append(card)

}

const pagination = (next, previous) => {
    btnNext = next ? `<img class="btn" data-url="${next}" src="./img/next.svg" />` : ''

    btnPrevious = previous ? `<img class="btn" data-url="${previous}" src="./img/back.svg" />` : ''
    btnPages.innerHTML = btnPrevious + " " + btnNext;
}

btnPages.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')){
        let value = e.target.dataset.url;
        getPokemons(value)
    }
})

