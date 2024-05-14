import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    if (inject(AuthenticationService).isAdmin()) {
        return true;
    }
    inject(Router).navigate(['/admin/authentication']);
    return false;
};
