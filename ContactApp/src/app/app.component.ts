import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ContactApp';
  constructor(private http:HttpClient){
  }
  ngOnInit(): void {
    this.http.get('/api/contact').subscribe(data=> {
      console.log(data);
    });
  }

// export class AppComponent implements OnInit {
//   title = 'ContactApp';
//   constructor(private http:HttpClient, private service: ContactService){
//   }
//   ngOnInit(): void {
//     this.service.getAllContacts(Global.BASE_USER_ENDPOINT + 'getAllContacts')
//     .subscribe((data: Contact) => this.config = {
//       heroesUrl: data['heroesUrl'],
//       textfile:  data['textfile']
//     });
//   }
}
