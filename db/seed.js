const db = require('../models');

const pokemonList = require('./pokemon.json');

// removes all pokemon and adds
db.Pokemon.remove({}, () => {
	pokemonList.forEach(pokemon => {
		db.Pokemon.create(pokemon, (error, createdPokemon) => {
			if (error) return console.log(error);
			console.log(createdPokemon);
		});
	});
});