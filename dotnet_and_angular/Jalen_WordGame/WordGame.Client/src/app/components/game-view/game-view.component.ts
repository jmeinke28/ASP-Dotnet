import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../../services/game-service';
import { ActivatedRoute } from '@angular/router';
import { GameDto } from '../../models/GameDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css'],
})
export class GameViewComponent implements OnInit {
  private _gameService = inject(GameService);
  gameId!: number;
  game!: GameDto;
  guess: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('gameId'));

    this._gameService.getAllGames().subscribe({
      next: (games) => (this.game = games.find((g) => g.id === this.gameId)!),
      error: (error) => {
        console.error('Error fetching game data:', error);
        this.errorMessage = 'Failed to load the game.';
      },
    });
  }

  makeGuess() {
    if (this.guess.length === 1) {
      this._gameService.makeGuess(this.gameId, this.guess).subscribe(
        (updatedGame) => {
          this.game = updatedGame;
        },
        (error) => {
          console.error('Error making guess:', error);
          this.errorMessage = 'Failed to make the guess.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a single character as a guess.';
    }

    this.guess = '';
  }
}
