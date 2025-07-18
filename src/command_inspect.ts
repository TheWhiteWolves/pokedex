import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log("A pokemon must be provided.");
        return;
    }

    const pokemonName = args[0];
    const pokemon = state.pokedex[pokemonName];
    if (!pokemon) {
        throw new Error("you have not caught that pokemon");
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (const type of pokemon.types) {
        console.log(`  - ${type.type.name}`);
    }
}