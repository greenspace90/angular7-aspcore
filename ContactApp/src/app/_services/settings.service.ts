import {  
    Injectable  
  } from '@angular/core';  
  import {  
    HttpClient,
    HttpResponse,  
    HttpParams,  
    HttpErrorResponse  
  } from '@angular/common/http';  
  import {  
    HttpHeaders  
  } from '@angular/common/http';  
  import {  
    Observable,  
    throwError  
  } from 'rxjs';  
  import {  
    catchError  
  } from 'rxjs/operators';  
  import {  
    ISettings
  } from '../_models'; 
   
  const httpOptions = {  
    headers: new HttpHeaders({  
        'Content-Type': 'application/json'  
    })  
  };  
  @Injectable()  
  export class SettingsService {  
    constructor(private http: HttpClient) {}  
    getSettings(url: string): Observable < ISettings > {  
        return this.http.get < ISettings > (url).pipe(catchError(this.handleError));  
    }  
    updateSettings(url: string, settings: ISettings): Observable < any > {  
        return this.http.put(url, settings, httpOptions).pipe(catchError(this.handleError));  
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
  