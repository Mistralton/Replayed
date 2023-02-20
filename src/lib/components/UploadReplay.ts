// import ranks from "./ranks.json"
import {supabase} from "../supabase"
import { signedStatus } from '../../stores/stores';

export async function replayInfo (game: string, rank: string, link: string) {
    let currUser = await supabase.auth.getUser()
    let user = currUser.data.user?.user_metadata.full_name;

    return {game, rank, user, link};
}

export async function replayInsert(newObj: {game: string, rank: string, user: string, link: string}) {
    const update = await fetch('/api/replay', {
        method: 'POST',
        body: JSON.stringify([
            newObj
        ])
    })
    const results = await update.json();
    return results;
}