import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import IResolver from "../interfaces/i-resolver";
import { SerieServiceService } from "../services/serie-service.service";
import { ISerieDetail } from "../interfaces/i-serie-detail";

@Injectable({ providedIn: 'root' })
export class SerieResolver implements IResolver<any> {
  user!: any;
  constructor(private serieService: SerieServiceService) {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISerieDetail>{
    return this.serieService.getSerieDetails(Number(route.paramMap.get('id')), this.user.language, this.user.userId);
  };
}

export default SerieResolver;
