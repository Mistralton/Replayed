export interface Replay {
  id: number
  created_at: string
  game: string
  rank: string
  user: string
  guesses: Array<{rank: string, guesses: number}>,
  comments: Array<{date: string, text: string}>
  link: string,
  duel_winner: number,
  total_duels: number
}