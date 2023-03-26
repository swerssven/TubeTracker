import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tube_Tracker';

  constructor(public tranlate: TranslateService) {
    // Definimos lenguajes traducción y por defecto.
    this.tranlate.addLangs(['es', 'en']);
    this.tranlate.setDefaultLang('es');
    this.tranlate.use('en');
  }
}
