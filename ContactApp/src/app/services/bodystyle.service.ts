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
  IBodystyle
} from '../model/bodystyle';  
const httpOptions = {  
  headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
  })  
};  
@Injectable()  
export class BodystyleService {  
  constructor(private http: HttpClient) {}  
  // get all vehicle data    
  getAllBodystyles(url: string): Observable < IBodystyle[] > {
      return this.http.get < IBodystyle[] > (url).pipe(catchError(this.handleError));  
  }  
  // insert new vehicle details    
  addBodystyle(url: string, bodystyle: IBodystyle): Observable < any > {  
      return this.http.post(url, JSON.stringify(bodystyle), httpOptions).pipe(catchError(this.handleError));  
  }  
  // update vehicle details    
  updateBodystyle(url: string, id: number, bodystyle: IBodystyle): Observable < any > {  
      const newurl = `${url}?id=${id}`;  
      return this.http.put(newurl, bodystyle, httpOptions).pipe(catchError(this.handleError));  
  }  
  // delete vehicle information    
  deleteBodystyle(url: string, id: number): Observable < any > {  
      const newurl = `${url}?id=${id}`; // DELETE api/contact?id=42    
      return this.http.delete(newurl, httpOptions).pipe(catchError(this.handleError));  
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



