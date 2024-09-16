/**
 * @file Provides services for user and movie management using HTTP requests.
 * This service handles all the API calls related to user registration, login,
 * movie retrieval, and management of user profiles and favorite movies.
 */

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
  /**
   * Constructor that injects HttpClient to enable HTTP requests.
   * @param http Angular HttpClient used for making HTTP requests.
   */

  constructor(private http: HttpClient) {}

  /**
   * Creates the HTTP headers needed for API requests, including the Authorization header.
   * @returns {HttpHeaders} HTTP headers with the Authorization token.
   */

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. User might not be logged in.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Registers a new user.
   * @param {any} userDetails - The details of the user to register.
   * @returns {Observable<any>} Observable containing the server's response.
   */

  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in an existing user.
   * @param {any} userCredentials - The credentials (username and password) of the user.
   * @returns {Observable<any>} Observable containing the login response with a JWT token.
   */

  public userLogin(userCredentials: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves a list of all movies.
   * @returns {Observable<any>} Observable containing an array of all movie objects.
   */

  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.createHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves details of a single movie by title.
   * @param {string} title - The title of the movie.
   * @returns {Observable<any>} Observable containing the movie details.
   */

  getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, { headers: this.createHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves movies where the specified actor is the main actor.
   * @param {string} actorName - The name of the main actor.
   * @returns {Observable<any>} Observable containing the movies featuring the main actor.
   */

  getMoviesByMainActor(actorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/mainActor/${actorName}`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves movies where the specified actor is a supporting actor.
   * @param {string} supportingActorName - The name of the supporting actor.
   * @returns {Observable<any>} Observable containing the movies featuring the supporting actor.
   */

  getMoviesBySupportingActor(supportingActorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/supportingActor/${supportingActorName}`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves movies by genre.
   * @param {string} genreName - The name of the genre.
   * @returns {Observable<any>} Observable containing movies of the specified genre.
   */

  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a user's details by username.
   * @param {string} username - The username of the user.
   * @returns {Observable<any>} Observable containing the user's details.
   */

  getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}`, { headers: this.createHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a user's favorite movies.
   * @param {string} username - The username of the user.
   * @returns {Observable<any>} Observable containing the user's favorite movies.
   */

  getFavoriteMovies(username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}/favorites`, {
        headers: this.createHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's favorite list.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to add.
   * @returns {Observable<any>} Observable containing the server's response.
   */

  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + `users/${username}/favorites/${movieId}`,
        {},
        { headers: this.createHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates a user's profile information.
   * @param {string} username - The username of the user.
   * @param {any} userDetails - The new user details.
   * @returns {Observable<any>} Observable containing the server's response.
   */

  editUser(username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user from the database.
   * @param {string} username - The username of the user.
   * @returns {Observable<any>} Observable containing the server's response.
   */

  deleteUser(username: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: this.createHeaders(),
        responseType: 'text',
      }) // Specify responseType as 'text'
      .pipe(
        map((response: any) => {
          // Log the response to ensure proper handling
          console.log('Response from deleteUser:', response);
          // Return the response to the component
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Removes a movie from the user's favorite list.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to remove.
   * @returns {Observable<any>} Observable containing the server's response.
   */

  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/favorites/${movieId}`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches multiple movie details by their IDs.
   * @param {string[]} movieIds - An array of movie IDs to retrieve details for.
   * @returns {Observable<any>} Observable containing the details of the specified movies.
   */

  getMoviesDetails(movieIds: string[]): Observable<any> {
    return this.http
      .post(
        apiUrl + 'movies/details',
        { movieIds },
        { headers: this.createHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Extracts response data or returns an empty object.
   * @param {any} res - The response from the HTTP request.
   * @returns {any} The extracted response data.
   */

  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles HTTP errors by logging and providing user-friendly error messages.
   * @param {HttpErrorResponse} error - The HTTP error response.
   * @returns {Observable<never>} An observable that throws an error message.
   */

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );

      switch (error.status) {
        case 404:
          console.error('Error 404: User not found.');
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
    return throwError('Something bad happened; please try again later.');
  }
}
