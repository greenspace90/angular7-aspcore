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
  IVehicle 
} from '../model/vehicle';  
const httpOptions = {  
  headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
  })  
};  
@Injectable()  
export class VehicleService {  
  constructor(private http: HttpClient) {}  
  // get all contact data    
  getAllVehicles(url: string): Observable < IVehicle[] > {  
      return this.http.get < IVehicle[] > (url).pipe(catchError(this.handleError));  
  }  
  // insert new contact details    
  addVehicle(url: string, vehicle: IVehicle): Observable < any > {  
      return this.http.post(url, JSON.stringify(vehicle), httpOptions).pipe(catchError(this.handleError));  
  }  
  // update contact details    
  updateVehicle(url: string, id: number, vehicle: IVehicle): Observable < any > {  
      const newurl = `${url}?id=${id}`;  
      return this.http.put(newurl, vehicle, httpOptions).pipe(catchError(this.handleError));  
  }  
  // delete contact information    
  deleteVehicle(url: string, id: number): Observable < any > {  
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
