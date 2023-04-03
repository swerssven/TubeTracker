import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../components/loginComponents/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router,
    private modalService: NgbModal) { }

  // Interceptor includes token in each http request.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = sessionStorage.getItem('token')!;

    let request = req;

    if(token){
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          sessionStorage.clear();
          this.modalService.dismissAll();  // Close all open modal windows.
          this.router.navigateByUrl('/home');   // Redirect to home and login component.
          this.modalService.open(LoginModalComponent);  // Open login component.
        }

        return throwError(() => new Error("Unauthorized, please login with correct credentials"));
      })
    );
  }
}
