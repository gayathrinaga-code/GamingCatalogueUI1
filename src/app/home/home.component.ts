import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  games: any[] = [];
  searchText: string = '';
  errorMessage: string = '';


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getGames().subscribe(
      (data: any[]) => {
        this.games = data;
      },
      (error) => {
        this.errorMessage = `There was an error: ${error}`;
        console.error('Error fetching products:', error);
      }
    );
  }

  filteredGames(): any[] {
    return this.games.filter(games => games.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
