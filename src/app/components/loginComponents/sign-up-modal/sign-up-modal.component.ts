import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iregister } from 'src/app/models/i-register';
import { LoginModalComponent } from '../login-modal/login-modal.component';

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
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[._/#?!@$%^&*-]).{8,}$/, // At leasr one uppercase, one lowercase, one digit and one special caracter. Min length 8.
    email:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    avatar: /.(gif|jpeg|jpg|png)$/i, // Only accepts gif, jpeg. jpg y png.
  };

  newUser: Iregister = {
    firstname: '',
    lastname: '',
    nickname: '',
    password: '',
    email: '',
    language: '',
    image: '',
    isAdmin: false,
  };

  registerForm!: FormGroup;
  imagen!: string;
  languages = [{ name: 'English', abbrev: 'EN' }, { name: 'Español', abbrev: 'ES' }];

  constructor(
    public activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private modalService: NgbModal,
    private activeModelService: NgbActiveModal,
    private router: Router
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
        [Validators.required, Validators.pattern(this.expresiones.nickname)],
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

  /*
  // Método para resetear formulario (errores, valores)
  resetForm(): void {
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach((key) => {
      this.registerForm.get(key)?.setErrors(null);
    });
    //this.opcionSelect = this.eventos[0];
  }*/

  // Método para añadir usuario a localstorage.
  registerUser() {
    console.log(this.registerForm);
    this.openLoginForm();

    //this.resetForm();
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
