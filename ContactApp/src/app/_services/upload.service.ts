import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    reportProgress: true
}

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private http: HttpClient) { }

    upload(url: string, image: any): Observable<any> {
        return this.http.post(url, JSON.stringify(image), httpOptions).pipe(catchError(this.handleError));
    }

    // custom handler    
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.    
            console.error('An error occurred:', error.error.message);
        } else {
            // the backend returned an unsuccessful response code.    
            // the response body may contain clues as to what went wrong,    
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message    
        return throwError('Something bad happened; please try again later.');
    }
}