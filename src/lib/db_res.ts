export interface Replay {
  created_at: string
  game: string
  rank: string
  usr: string
  guesses: Array<{rank: string, guesses: number}>,
  comments: Array<{date: string, text: string}>
  tags: null,
  link: string,
  duel_winner: number,
  total_duels: number
}