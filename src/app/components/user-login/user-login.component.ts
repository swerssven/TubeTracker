import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin } from 'src/app/models/i-login';
import { ILoginResponse } from 'src/app/models/i-login-response';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService
  ) {
    this.formLogin = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Login() {
    const userLogin: ILogin = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password,
    };

    console.log(userLogin);

    this.userService.getToken(userLogin).subscribe(
      (res) => {
        console.log(res.token);
        let decodedJWT = JSON.parse(window.atob(res.token.split('.')[1]));
        console.log(decodedJWT.userId);
      }
    )
  }
}
