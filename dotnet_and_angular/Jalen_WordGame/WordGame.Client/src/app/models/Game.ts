export interface Game {
  gameId: number;      
  phrase: string;      
  remainingGuesses: number; 
  answer: string;      
  gameStatus: string;  
}