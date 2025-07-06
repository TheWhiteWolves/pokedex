import { State } from './state.js';

export function cleanInputSegmenter(input: string): string[] {
    const segmenter = new Intl.Segmenter([], { granularity: 'word' });
    const segments = segmenter.segment(input);
    return [...segments].filter(s => s.isWordLike).map(s => s.segment.toLowerCase());
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export async function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", async (line) => {
        const words = cleanInput(line);
        if (words.length > 0) {
            const [command, ...rest] = words;
            const cmd = state.commands[command];
            if (!cmd) {
                console.log(`Unknown command: "${command}". Type "help" for a list of commands.`);
                state.readline.prompt();
                return;
            }

            try {
                await cmd.callback(state, ...rest);
            } catch (e) {
                console.log((e as Error).message);
            }
        }
        state.readline.prompt();
    });
}