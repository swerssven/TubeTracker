import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import ICanActivate from '../interfaces/i-can-activate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../components/loginComponents/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGardGuard implements ICanActivate {
  constructor(private router: Router,
    private modalService: NgbModal) {}

  canActivate(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      return true;
    } else {
      this.modalService.dismissAll();  // Close all open modal windows.
      this.router.navigateByUrl('/home');   // Redirect to home and login component.
      this.modalService.open(LoginModalComponent);  // Open login component.
      return false;
    }
  }
}
