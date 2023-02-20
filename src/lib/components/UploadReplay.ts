// import ranks from "./ranks.json"
import {supabase} from "../supabase"
import { signedStatus } from '../../stores/stores';

export async function replayInfo (game: string, rank: string, link: string) {
    let currUser = await supabase.auth.getUser()
    let user = currUser.data.user?.user_metadata.full_name;
    let defaults: { rank: string; guesses: number; }[] = []
    if (game === "Valorant") {
        defaults = [
            {
              "rank": "Bronze",
              "guesses": 0
            },
            {
              "rank": "Platinum",
              "guesses": 0
            },
            {
              "rank": "Radiant",
              "guesses": 0
            },
            {
              "rank": "Iron",
              "guesses": 0
            },
            {
              "rank": "Gold",
              "guesses": 0
            },
            {
              "rank": "Silver",
              "guesses": 0
            },
            {
              "rank": "Ascendant",
              "guesses": 0
            },
            {
              "rank": "Immortal",
              "guesses": 0
            },
            {
              "rank": "Diamond",
              "guesses": 0
            }
          ]
    }
    if (game === "Overwatch") {
        defaults = [
            {
              "rank": "Bronze",
              "guesses": 0
            },
            {
              "rank": "Platinum",
              "guesses": 0
            },
            {
              "rank": "Top500",
              "guesses": 0
            },
            {
              "rank": "Gold",
              "guesses": 0
            },
            {
              "rank": "Silver",
              "guesses": 0
            },
            {
              "rank": "Master",
              "guesses": 0
            },
            {
              "rank": "Grand Master",
              "guesses": 0
            },
            {
              "rank": "Diamond",
              "guesses": 0
            }
          ]
    }

    if(defaults[0]) return {game, rank, user, link, defaults};
    else return {game, rank, user, link}
}

export async function replayInsert(newObj: {game: string, rank: string, user: string, link: string, defaults?: any}) {
    console.log(newObj)
    const update = await fetch('/api/replay', {
        method: 'POST',
        body: JSON.stringify(newObj)
    })
    console.log(update)
    const results = await update.json();
    return results;
}