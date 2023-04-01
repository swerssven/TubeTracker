import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/interfaces/i-user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss'],
})
export class SignUpModalComponent {
  expresiones = {
    firstname: /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/m, // Uppercase, lowercase only.
    lastname: /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/m, // Uppercase, lowercase only.
    nickname: /^[-_A-Za-zÀ-ÿ0-9\u00f1\u00d1 ]+$/m, // Uppercase, lowercase, digits y special caracters (-_/).
    password:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[._/#?!@$%^&*-]).{8,}$/, // At least one uppercase, one lowercase, one digit and one special caracter. Min length 8.
    email:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    avatar: /.(gif|jpeg|jpg|png)$/i, // Only accepts gif, jpeg. jpg y png.
  };

  registerForm!: FormGroup;
  imagen!: string;
  languages = [{ name: 'English', abbrev: 'EN' }, { name: 'Español', abbrev: 'ES' }];
  newUser: IUser = {
    firstname: '',
    lastname: '',
    nickname: '',
    password: '',
    email: '',
    language: '',
    image: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private modalService: NgbModal,
    private activeModelService: NgbActiveModal,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    this.registerForm = this.initForm();
  }

  // Método para inicializar formulario
  initForm(): FormGroup {
    return this.fb.group({
      firstname: [
        '',
        [Validators.required, Validators.pattern(this.expresiones.firstname)],
      ],
      lastname: [
        '',
        [Validators.required, Validators.pattern(this.expresiones.lastname)],
      ],
      nickname: [
        '',
        [Validators.required, Validators.maxLength(15), Validators.pattern(this.expresiones.nickname)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.expresiones.password),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.expresiones.email)],
      ],
      language: ['EN', Validators.required],
      avatar: null
    });
  }

  // Método para enviar datos a API.
  registerUser() {
    this.newUser = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      nickname: this.registerForm.value.nickname,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      language: this.registerForm.value.language,
      image: this.registerForm.value.image
    };

    console.log(this.registerForm);
    this.userService.createUser(this.newUser).subscribe({
      next: (res) => console.log(res),
      error:HttpErrorResponse  => console.error(Error),
      complete: () => {
        this.openLoginForm();
      },
    });
  }

  openLoginForm() {
    this.activeModelService.close();
    this.modalService.open(LoginModalComponent);
  }

  // Método para leer archivo de campo imagen.
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.imagen = reader.result as string;
      this.newUser.image = reader.result as string;
    });
  }
}
