import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  expresiones = {
    firstname: /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/m, // Uppercase, lowercase only.
    lastname: /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/m, // Uppercase, lowercase only.
    nickname: /^[-_A-Za-zÀ-ÿ0-9\u00f1\u00d1 ]+$/m, // Uppercase, lowercase, digits y special caracters (-_/).
    password:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[._/#?!@$%^&*-]).{8,}$/, // At least one uppercase, one lowercase, one digit and one special caracter. Min length 8.
    email:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    image: /.(gif|jpeg|jpg|png)$/i, // Only accepts gif, jpeg. jpg y png.
  };

  user!: any;

  registerForm!: FormGroup;
  imagen!: string;
  languages = [{ name: 'English', abbrev: 'en-EN' }, { name: 'Español', abbrev: 'es-ES' }];
  newUser: IUser = {
    userId: 0,
    firstname: '',
    lastname: '',
    nickname: '',
    password: '',
    email: '',
    language: '',
    image: ''
  };
  private subscriptions: Subscription = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private modalService: NgbModal,
    private activeModelService: NgbActiveModal,
    private router: Router,
    private userService: UserServiceService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
    this.registerForm = this.initForm();
  }

  // Método para inicializar formulario
  initForm(): FormGroup {
    return this.fb.group({
      nickname: [
        this.user.nickname,
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
        this.user.email,
        [Validators.required, Validators.pattern(this.expresiones.email)],
      ],
      language: [this.user.language, Validators.required],
      image: null
    });
  }

  // Método para enviar datos a backend.
  editUser() {
    this.newUser = {
      userId: this.user.userId,
      firstname: this.user.firstName,
      lastname: this.user.lastName,
      nickname: this.registerForm.value.nickname,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      language: this.registerForm.value.language,
      image: this.user.image
    };
    console.log(this.newUser)

    this.subscriptions.add(
      /// Edit service
    );
  }

  openLoginForm() {
    this.activeModelService.close();
    this.modalService.open(LoginModalComponent, {backdrop: 'static', keyboard: false, centered: true});
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
      this.user.image = reader.result as string;
    });
  }

  changeLanguage(){
    console.log(this.registerForm.value.language)
    this.translate.use(this.registerForm.value.language)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
