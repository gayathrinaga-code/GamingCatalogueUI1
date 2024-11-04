import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent {
  displayedColumns: string[] = ['title', 'description', 'platform', 'game_Price','developedBy','ageLevel','actions'];
  games: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGamesGetails();
  }

  loadGamesGetails(): void {
    this.apiService.getGames().subscribe(data => {
      this.games = data;
    },
    (error) => {
      this.errorMessage = `There was an error: ${error}`;
      console.error('Error fetching products:', error);
    }
  );
  }

  openDialog(action: string, game?: any): void {
    console.log(game)
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '300px',
      data: { action, game }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'result')
      if (result && result.event === 'Add') {
        this.apiService.addGame(result.data).subscribe(() => this.loadGamesGetails());
      } else if (result && result.event === 'Update') {
        this.apiService.updateGame(result.data).subscribe(() => this.loadGamesGetails());
      } else if (result && result.event === 'Delete') {
        this.apiService.deleteGame(result.data.id).subscribe(() => this.loadGamesGetails());
      }
    });
  }
}
