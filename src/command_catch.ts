import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log("A pokemon must be provided.");
        return;
    }

    const pokemonName = args[0];
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const attempt = Math.floor(Math.random() * 255);
    const isCaught = attempt > pokemon.base_experience;
    if (isCaught) {
        state.pokedex[pokemonName] = pokemon;
        console.log(`${pokemonName} was caught!`);
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}
