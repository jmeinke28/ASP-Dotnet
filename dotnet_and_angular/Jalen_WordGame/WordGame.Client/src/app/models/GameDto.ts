export interface GameDto {
  id: number;
  userId: string;
  status: string;
  phrase: string;
  guesses: string;
  remainingGuesses: number;
  answer: string;
}
