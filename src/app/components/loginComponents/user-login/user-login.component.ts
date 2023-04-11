import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { IUserResponse } from 'src/app/interfaces/i-user-response';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  formLogin!: FormGroup;
  /*user: IUserResponse = {
    id: 0,
    firstname: '',
    lastname: '',
    nickname: '',
    email: '',
    language: '',
    image: '',
  };*/

  user!: any;
  logged: boolean = false;

  constructor(
    private modalService: NgbModal, public router: Router, private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
    console.log(this.user)
  }

  ngDoCheck(): void { // Use ngDoCheck instead of ngOnInit because we need the component to change state when user logs in.
    if(localStorage.getItem('user')){
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
      this.logged = true;
    }
  }

  openLoginForm(): void {
    this.modalService.open(LoginModalComponent);
  }
}
