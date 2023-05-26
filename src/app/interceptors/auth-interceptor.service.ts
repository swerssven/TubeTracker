import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../components/loginComponents/login-modal/login-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router,
    private modalService: NgbModal, private translate: TranslateService) { }

  // Interceptor includes token in each http request.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token')!;

    let request = req;

    if(token && req.url.includes('api')){
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    // return next.handle(request).pipe(
    //   catchError((err: HttpErrorResponse) => {
    //     if(err.status === 401){
    //       localStorage.clear();
    //       this.modalService.dismissAll();  // Close all open modal windows.
    //       this.router.navigateByUrl('/home');   // Redirect to home and login component.
    //       this.modalService.open(LoginModalComponent, {backdrop: 'static', keyboard: false, centered: true});  // Open login component.
    //     }

    //     return throwError(() => new Error("Unauthorized, please login with correct credentials"));
    //   })
    // );
    // return next.handle(request).pipe(
    //   map((event: HttpEvent<any>) => {
    //     // Comprueba si el evento es una respuesta HTTP exitosa
    //     if (event instanceof HttpResponse && event.status === 401) {
    //       localStorage.clear();
    //       this.modalService.dismissAll();
    //       this.router.navigateByUrl('/home');
    //       this.modalService.open(LoginModalComponent, { backdrop: 'static', keyboard: false, centered: true });
    //       throw new Error("Unauthorized, please login with correct credentials");
    //     }
    //     return event;
    //   })
      // catchError((error: any) => {
      //   // Maneja otros errores aquí
      //   return throwError(error);
      // })
    // );
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          localStorage.clear();
          this.modalService.dismissAll();
          this.router.navigateByUrl('/home');
          this.modalService.open(LoginModalComponent, { backdrop: 'static', keyboard: false, centered: true });
          return throwError(new Error("Unauthorized, please login with correct credentials"));
        } else {
          return throwError(error);
        }
      })
    );
  }
}
