import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';

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
    private userService: UserServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  Login() {}

  openLoginForm(): void {
    this.modalService.open(LoginModalComponent);
  }

  openSignUpForm(): void {
    this.modalService.open(SignUpModalComponent);
  }

  logOut(): void {
    sessionStorage.clear();
  }
}
