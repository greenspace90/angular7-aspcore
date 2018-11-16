import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public dialogRef: MatDialogRef<LoginComponent>
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });

        // subscribe on value changed event of form to show validation message
        this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        const form = this.loginForm;
        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            // setup custom validation message to form
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'username': '',
        'password': ''
    };

    validationMessages = {
        'username': {
            'required': 'Username is required.'
        },
        'password': {
            'required': 'Password is required.'
        }
    }

    cancel() {
        this.dialogRef.close();
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    // onSubmit() {
    //     this.submitted = true;

    //     // stop here if form is invalid
    //     if (this.loginForm.invalid) {
    //         return;
    //     }

    //     this.loading = true;
    //     this.authenticationService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }

    login() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    register() {
        this.router.navigate(['register']);
        // this.dialogRef.afterClosed.pipe(
        //   tap(() => this.router.navigate(['navigate to wherever'])),
        //   first()
        // ).subscribe();
        this.dialogRef.close();
    }

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //     if (result === 'success') {
    //       this.loadingState = true;
    //       this.loadVehicles(id);
    //       switch (this.dbops) {
    //         case DBOperation.create:
    //           this.showMessage('Data successfully added.');
    //           break;
    //         case DBOperation.update:
    //           this.showMessage('Data successfully updated.');
    //           break;
    //         case DBOperation.delete:
    //           this.showMessage('Data successfully deleted.');
    //           break;
    //       }
    //     } else if (result === 'error') {
    //       this.showMessage('There is some issue in saving records, please contact to system administrator!');
    //     } else {
    //       // this.showMessage('Please try again, something went wrong');
    //     }
    //   });
}
