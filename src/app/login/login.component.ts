import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, SecurityService, UserService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    isLoggingIn: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private securityService: SecurityService,
        private userService: UserService,
    ) { }

    private setTokenInLocalStorage(token: string) {
        localStorage.setItem('token', token)
    }

    private getUserInformation(username: string) {
        this.userService.getUsersByIdentifier(username)
            .subscribe(
                (user: any) => {
                    this.securityService.setUser(user)
                    this.router.navigate([this.returnUrl])
                },
                err => {
                    console.log(err)
                }
            )
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.securityService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.securityService.authenticate(this.f.username.value, this.f.password.value)
            .subscribe(
                (res: any) => {
                    let data = res
                    this.setTokenInLocalStorage(data.access_token);
                    this.getUserInformation(this.f.username.value);
                    this.isLoggingIn = true;
                },
                err => {
                    this.alertService.error(err);
                    this.loading = false;
                    console.log(err)
                }
            )
    }


}
