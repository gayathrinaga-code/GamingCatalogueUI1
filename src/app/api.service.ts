import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5041/api'; 

  constructor(private http: HttpClient) { }

  getGames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Games`)
    .pipe(
      catchError(this.handleError)
    );

  }

  addGame(game: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Games`, game)
    .pipe(
      catchError(this.handleError)
    );

  }

  updateGame(game: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Games`, game)
    .pipe(
      catchError(this.handleError)
    );

  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Games/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Customize this section depending on your error handling strategy
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Log the error (could be sent to a server for logging)
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
