import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {TokenStorageService} from "../../user/user-service/token-storage.service";
import {ToastrService} from "ngx-toastr";



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private toastr: ToastrService) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    if (token == null) {
      this.router.navigateByUrl('');
      this.toastr.warning('Chưa login', '401');
      return false;
    } else {
      return true;
    }
  }
}
