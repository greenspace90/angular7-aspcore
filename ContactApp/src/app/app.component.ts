import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService, AuthenticationService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';


import { LoginComponent } from '@app/components/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ContactApp';
  loggedIn = false;
  buttonText = 'Login';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.http.get('/api/contact').subscribe(data => {
      console.log(data);
    });
  }

  buttonClick() {
    if (this.loggedIn) {
      this.logOut();
    }
    else {
      this.login();
    }
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'success') {
        this.loggedIn = true;
        this.buttonText = 'Log Out';
      } else if (result === 'error') {
      } else {
        // this.showMessage('Please try again, something went wrong');
      }
    });
  };

  logOut() {
    this.authenticationService.logout();
    this.loggedIn = false;
    this.buttonText = 'Login';
    this.router.navigate(['']);
  }
}
