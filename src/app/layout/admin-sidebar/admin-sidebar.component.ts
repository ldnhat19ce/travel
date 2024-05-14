import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../common/services/auth/authentication.service';

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
    private _authenticationService = inject(AuthenticationService);

    logout() {
        this._authenticationService.adminLogout();
    }
}
