import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    if (token == null) {
      this.router.navigateByUrl('/');
      this.toastr.error('Chưa login', '401');
      return false;
    } else if (!token || !this.isRole()) {
      this.router.navigateByUrl('/');
      this.toastr.error('Bạn không có quyền truy cập vào trang này', '403');
      return false;
    } else {
      return true;
    }
  }

  isRole() {
    // const tokenPayload = this.tokenStorageService.getAuthorities();
    const tokenPayload = ['ROLE_ADMIN'];
    for (const role of tokenPayload) {
      if (role === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }

}
