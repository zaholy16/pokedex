"use strict"

const container = document.querySelector('.container');
const btnPages = document.querySelector('.btnPages');
const select = document.querySelector('#select')
let btnNext, btnPrevious;
let abilities = [];
let types = [];
let typesSelect = [];
let pokemons = [];
let pokemonUrl = [];
let abilityString = '';

const urlPokemon = "https://pokeapi.co/api/v2/pokemon";
const urlType = "https://pokeapi.co/api/v2/type";

const getPokemons = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        dataPokemons(data.results);
        pagination(data.next, data.previous);
        getTypes(urlType);
    } catch (error) {
        console.log(error);
    }
}

getPokemons(urlPokemon);

const getTypes = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.results); 
        typesSelect = data.results;
    
        typesSelect.forEach((element,i) => {
            // console.log(element.url);
            let option = document.createElement('option')
            option.setAttribute('value', i+1)
            option.innerText = element.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }
}

const dataPokemons = async (data) => {
    container.innerHTML = ''; //Clear data
    try {
        for (const index of data) {
            // console.log(index.url)
            const response = await fetch(index.url);
            const results = await response.json();

            abilities = results.abilities;
            types = results.types;
            // console.log(types)
        
           drawCard(results.id, results.name.toUpperCase(), results.sprites.other.dream_world.front_default, types, abilities, results.weight)
        }

    } catch (error) {
        console.log(error);
    }
}

const dataTypes = async (value) => {
    container.innerHTML = ''; //Clear data
    try {
        const response = await fetch(urlType+`/${value}/`)
        const data = await response.json()
        // console.log(data.pokemon)
        pokemons = data.pokemon;
        
        pokemons.forEach(async (element) => { 
            pokemonUrl = element.pokemon.url
            const response = await fetch(pokemonUrl)
            const data = await response.json()
            // console.log(data)

            abilities = data.abilities;
            types = data.types;
           
           drawCard(data.id, data.name.toUpperCase(), data.sprites.other.dream_world.front_default, types, abilities, data.weight)
        });


    } catch (error) {
        console.log(error)
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
        // console.log(index.ability.name)
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

select.addEventListener('change', async(e) => {

    const value = e.target.value;
    // console.log(value);
    dataTypes(value);
})
