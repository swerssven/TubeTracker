import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { IUserResponse } from 'src/app/interfaces/i-user-response';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  formLogin!: FormGroup;
  user!: IUserResponse;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  Login() {}

  openLoginForm(): void {
    this.modalService.open(LoginModalComponent);
  }

  openSignUpForm(): void {
    this.modalService.open(SignUpModalComponent);
  }

  logOut(): void {
    localStorage.clear();
  }
}
