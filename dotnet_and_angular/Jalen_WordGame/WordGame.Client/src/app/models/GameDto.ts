export interface GameDto {
  id: number;
  userId: string;
  status: string;
  phrase: string;
  remainingGuesses: number;
  answer: string;
}