import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILogin } from 'src/app/interfaces/i-login';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  loginForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private activeModelService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService,
    private modalService: NgbModal
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Login() {
    const userLogin: ILogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.userService.getToken(userLogin).subscribe(
      (res) => {
      localStorage.setItem('token', res.token);
      let decodedJWT = JSON.parse(window.atob(res.token.split('.')[1]));

      this.userService.getUser(decodedJWT.userId, res.tokenType, res.token).subscribe({
        next: (user) => localStorage.setItem('user', JSON.stringify(user)),
        error: (error) => console.log(error.status),
        complete: () => {
          this.activeModelService.close();
        },
      });
    });
  }

  openRegisterForm(): void {
    this.activeModelService.close();
    this.modalService.open(SignUpModalComponent);
  }
}
