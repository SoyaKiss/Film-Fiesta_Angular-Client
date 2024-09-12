import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Ensure the service path is correct
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  // Fetch favorite movies from local storage and then fetch their full details
  loadFavoriteMovies(): void {
    const username = localStorage.getItem('username'); // Assuming username is stored in local storage
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe(
        (movies) => {
          this.favoriteMovies = movies;
          console.log('Loaded favorite movies:', this.favoriteMovies);
        },
        (error) => {
          console.error('Error fetching favorite movies:', error);
        }
      );
    }
  }

  removeFavorite(movieId: string): void {
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie._id !== movieId
    );
    const updatedFavorites = this.favoriteMovies.map((movie) => movie._id);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  }
}
