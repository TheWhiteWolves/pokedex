// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
    const cacheInterval = 1000 * 60 * 5; // 5 minutes
    const state = initState(cacheInterval);
    await startREPL(state);
}

main();