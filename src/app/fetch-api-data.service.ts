import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://film-fiesta-2f42541ec594.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {} // Ensure no circular dependency is created

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. User might not be logged in.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // User registration
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User Login
  public userLogin(userCredentials: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  // Get all movies; main page
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.createHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Show a single movie card
  getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, { headers: this.createHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Show Main Actor
  getMoviesByMainActor(actorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/mainActor/${actorName}`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Show Supporting Actor
  getMoviesBySupportingActor(supportingActorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/supportingActor/${supportingActorName}`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Show Genre
  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get User
  getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}`, { headers: this.createHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get Fav Movie for User
  getFavoriteMovies(username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}/favorites`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a movie to Fav Movie List
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + `users/${username}/favorites/${movieId}`,
        {},
        { headers: this.createHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  // Edit User Profile
  editUser(username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete User completely
  deleteUser(username: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${username}`, { headers: this.createHeaders() }) // Ensure headers are correct
      .pipe(catchError(this.handleError));
  }

  // Delete a movie from the Fav Movie List
  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/favorites/${movieId}`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    return res || {};
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );

      // Log specific errors based on status codes for better debugging
      switch (error.status) {
        case 404:
          console.error('Error 404: Resource not found. Please check the URL.');
          break;
        case 400:
          console.error('Error 400: Bad request. Check the sent parameters.');
          break;
        case 500:
          console.error('Error 500: Internal Server Error.');
          break;
        default:
          console.error(`Unexpected error occurred: ${error.message}`);
          break;
      }
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
