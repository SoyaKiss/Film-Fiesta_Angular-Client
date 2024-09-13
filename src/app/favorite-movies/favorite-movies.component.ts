import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Ensure the service path is correct
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

// import { FavoriteMovieCardComponent } from '../favorite-movie-card/favorite-movie-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Movie {
  _id: string;
  Title?: string;
  ImageURL?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    // FavoriteMovieCardComponent,
  ],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.loadFavoriteMovies();
  }
}

// Temporarily disable this until we can resolve it
// loadFavoriteMovies(): void {
//     const username = localStorage.getItem('username');
//     if (username) {
//       // Fetch the IDs of favorite movies from the backend
//       this.fetchApiData.getFavoriteMovies(username).subscribe({
//         next: (movieIds: string[]) => {
//           console.log('Fetched favorite movie IDs:', movieIds);
//           this.favoriteMovies = []; // Clear the list before populating it

//           // For each ID, fetch the full movie details
//           movieIds.forEach((id) => {
//             this.fetchApiData.getOneMovie(id).subscribe(
//               (movie: Movie) => {
//                 if (movie && movie._id) {
//                   this.favoriteMovies.push(movie); // Add complete movie data to the array
//                   console.log('Fetched full movie data:', movie);
//                 } else {
//                   console.warn('Fetched movie is incomplete:', movie);
//                 }
//               },
//               (error: any) => {
//                 console.error('Error fetching movie details:', error);
//               }
//             );
//           });
//         },
//         error: (error: any) => {
//           console.error('Error fetching favorite movies:', error);
//         },
//       });
//     }
//   }

//   // Remove a movie from the favorites list
//   removeFavorite(movieId: string): void {
//     this.favoriteMovies = this.favoriteMovies.filter(
//       (movie: Movie) => movie._id !== movieId
//     );
//     const updatedFavorites = this.favoriteMovies.map(
//       (movie: Movie) => movie._id
//     );
//     localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
//     this.snackBar.open('Removed from Favorites!', 'OK', { duration: 2000 });
//   }
// }
