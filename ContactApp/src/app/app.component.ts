import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginComponent } from '@app/components/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ContactApp';

  constructor(private http:HttpClient, private dialog: MatDialog){ }

  ngOnInit(): void {
    this.http.get('/api/contact').subscribe(data=> {
      console.log(data);
    });
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.loadingState = true;
    //   this.loadContacts();
    // });
  };
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
