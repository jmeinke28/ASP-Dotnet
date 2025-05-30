import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game-service';
import { GameDto } from '../../models/GameDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  games: GameDto[] = [];
  errorMessage: string | null = null;
  private _gameService = inject(GameService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    this._gameService.getAllGames().subscribe(
      (games) => {
        this.games = games;
        console.log(games);
      },
      (error) => {
        this.errorMessage = 'Failed to load games.';
        console.error('Error loading games:', error);
      }
    );
  }

  deleteGame(gameId: number) {
    this._gameService.deleteGame(gameId).subscribe(
      () => {
        this.loadGames();
        console.log(`Game with ID: ${gameId} deleted`);
      },
      (error) => {
        this.errorMessage = 'Failed to delete game.';
        console.error('Error deleting game:', error);
      }
    );
  }

  createNewGame() {
    this._gameService.createGame().subscribe({
      next: (newGame) => {
        this.games.push(newGame);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create new game.';
        console.error('Error creating new game:', error);
      },
    });
  }

  viewGame(gameId: number) {
    this.router.navigate([`/wordgame/${gameId}`]);
  }
}
