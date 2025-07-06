import type { State } from "./state.js";

export async function commandPokedex(state: State, ...args: string[]) {
    console.log("Your Pokedex:");
    for (const pokemon of Object.values(state.pokedex)) {
        console.log(` - ${pokemon.name}`);
    }
}