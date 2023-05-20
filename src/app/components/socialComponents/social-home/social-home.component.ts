import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-home',
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.scss'],
})
export class SocialHomeComponent {
  constructor(public router: Router) {}
}
