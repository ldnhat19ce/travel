import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderModule } from '../../../../layout/admin-header/admin-header.module';
import { AdminFooterModule } from '../../../../layout/admin-footer/admin-footer.module';
import { AdminSidebarModule } from '../../../../layout/admin-sidebar/admin-sidebar.module';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        AdminHeaderModule,
        AdminFooterModule,
        AdminSidebarModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
