import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILogin } from 'src/app/interfaces/i-login';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  isLoading: boolean = false;
  loginForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private activeModelService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService,
    private modalService: NgbModal,
    private dataService: DataServiceService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Login() {
    this.isLoading = true;
    const userLogin: ILogin = {
      email: this.loginForm.value.email,
      password: MD5(this.loginForm.value.password).toString(),
    };

    this.subscriptions.add(
      this.userService.getToken(userLogin).subscribe(
        {
          next: (res) => {
            localStorage.setItem('token', res.token);
            let decodedJWT = JSON.parse(window.atob(res.token.split('.')[1]));

            this.subscriptions.add(
              this.userService
                .getUser(decodedJWT.userId /*, res.tokenType, res.token*/)
                .subscribe({
                  next: (user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.translate.use(user.language);
                    this.isLoading = false;
                  },
                  error: (error) => {
                    console.log(error.status);
                  },
                  complete: () => {
                    this.activeModelService.close();
                    window.location.reload();
                  },
                })
            );
          },
          error: (error) => {
            this.toastr.error(this.translate.instant("LOGIN.INCORRECT"), 'Tube Tracker',{
              tapToDismiss: true,
              closeButton: true,
              positionClass: 'toast-bottom-right'
            });
          }
        }
      )
    );
  }

  openRegisterForm(): void {
    this.activeModelService.close();
    this.modalService.open(SignUpModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
