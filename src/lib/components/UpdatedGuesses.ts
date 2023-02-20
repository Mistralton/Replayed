export function newGuesses (guessRank: string, oldGuesses: [{rank: string, guesses: number}]) {

    const index = oldGuesses.findIndex((guess) => guess.rank === guessRank);
    const oldGuessAmt = oldGuesses[index].guesses;
    if (index !== -1) {
        oldGuesses.splice(index, 1, { rank: guessRank, guesses: oldGuessAmt + 1});
    }
    return oldGuesses;
}

export async function patchGuesses(id: number, newGuesses: [{rank: string, guesses: number}]) {
    const update = await fetch('/api/db', {
        method: 'PATCH',
        body: JSON.stringify(
        {
            id: id,
            changes: newGuesses
        }
        )
    })
    const results = await update.json();
    return results;
}