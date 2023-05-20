import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tube_Tracker';
  user!: any;

  constructor(public translate: TranslateService, public router: Router) {
    // Definimos lenguajes traducción y por defecto.
    this.translate.addLangs(['es-ES', 'en-EN']);
    this.translate.setDefaultLang('en-EN');
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
      this.translate.use(this.user.language);
    }
  }
}
