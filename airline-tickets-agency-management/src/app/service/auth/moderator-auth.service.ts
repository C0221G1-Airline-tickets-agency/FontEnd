import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from "../../user/user-service/token-storage.service";


@Injectable({
  providedIn: 'root'
})
export class ModeratorAuthService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getUser();
    if (token == null) {
      this.router.navigateByUrl('/');
      this.toastr.warning('Chưa login', '401');
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
    const user = this.tokenStorageService.getUser();
    const roles = user.roles;
    for (const role of roles) {
      if (role === 'ROLE_ADMIN' || role === 'ROLE_MODERATOR') {
        return true;
      }
    }
    return false;
  }
}
