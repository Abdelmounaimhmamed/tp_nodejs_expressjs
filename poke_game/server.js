#!/usr/bin/env node
// runs code in Abdelmounaim env

const axios = require('axios');
const inquirer = require('inquirer').default;

const baseURL = 'https://pokeapi.co/api/v2';

async function fetchPokemon() {
    const response = await axios.get(`${baseURL}/pokemon?limit=100`);
    return response.data.results;
}

async function selectPokemon(pokemonList) {
    const choices = pokemonList.map(pkmn => ({ name: pkmn.name, value: pkmn.url }));
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'pokemonUrl',
        message: 'Choose a Pokémon:',
        choices
    });
    return answer.pokemonUrl;
}

async function fetchPokemonDetails(url) {
    const response = await axios.get(url);
    return response.data;
}

async function selectMove(moves) {
    const choices = moves.map(move => ({ name: move.move.name, value: move.move.url }));
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'moveUrl',
        message: 'Choose a move:',
        choices
    });
    return answer.moveUrl;
}

async function fetchMoveDetails(url) {
    const response = await axios.get(url);
    return response.data;
}

function calculateDamage(move) {
    return move.power ? move.power : 20; 
}

async function battle(playerPokemon, botPokemon) {
    console.log(`\nBattle starts: ${playerPokemon.name} vs ${botPokemon.name}!`);
    
    let playerHP = 300;
    let botHP = 300;
    
    while (playerHP > 0 && botHP > 0) {
        console.log(`\n${playerPokemon.name} HP: ${playerHP} | ${botPokemon.name} HP: ${botHP}`);
        
        const playerMoveUrl = await selectMove(playerPokemon.moves);
        const playerMoveDetails = await fetchMoveDetails(playerMoveUrl);
        const playerDamage = calculateDamage(playerMoveDetails);
        botHP -= playerDamage;
        console.log(`You used ${playerMoveDetails.name}! It dealt ${playerDamage} damage.`);
        
        if (botHP <= 0) {
            console.log(`\n${botPokemon.name} fainted! You win!`);
            return;
        }
        
        const botMoveIndex = Math.floor(Math.random() * botPokemon.moves.length);
        const botMoveUrl = botPokemon.moves[botMoveIndex].move.url;
        const botMoveDetails = await fetchMoveDetails(botMoveUrl);
        const botDamage = calculateDamage(botMoveDetails);
        playerHP -= botDamage;
        console.log(`${botPokemon.name} used ${botMoveDetails.name}! It dealt ${botDamage} damage.`);
        
        if (playerHP <= 0) {
            console.log(`\nYour ${playerPokemon.name} fainted! You lose!`);
            return;
        }
    }
}

async function main() {
    try {
        const pokemonList = await fetchPokemon();
        
        console.log("Select your Pokémon:");
        const playerPokemonUrl = await selectPokemon(pokemonList);
        const playerPokemon = await fetchPokemonDetails(playerPokemonUrl);
        console.log(`You selected ${playerPokemon.name}.`);
        
        const botPokemonUrl = pokemonList[Math.floor(Math.random() * pokemonList.length)].url;
        const botPokemon = await fetchPokemonDetails(botPokemonUrl);
        console.log(`The bot selected ${botPokemon.name}.`);
        
        await battle(playerPokemon, botPokemon);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();