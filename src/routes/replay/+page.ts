export async function load({ url }) {
    const type = url.searchParams.get('game');
    return {game: type};
}