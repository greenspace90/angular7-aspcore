import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginComponent } from '@app/components/login';


@Component({ 
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css'] })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private dialog: MatDialog
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // subscribe on value changed event of form to show validation message
        this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.registerForm) { return; }
        const form = this.registerForm;
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
        'firstName': '',
        'lastName': '',
        'username': '',
        'password': ''
    };

    validationMessages = {
        'firstName': {
            'required': 'First Name is required.'
        },
        'lastName': {
            'required': 'Last Name is required.'
        },
        'username': {
            'required': 'Username is required.'
        },
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be a minimum of 6 characters.'
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    login(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '300px'
        });
    }

    // onSubmit() {
    //     console.log('Hit method');
    // }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
