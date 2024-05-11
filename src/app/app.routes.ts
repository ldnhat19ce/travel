import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/pages/general/not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import("./common/pages/application/home/home.module").then(module => module.HomeModule) },
    { path: 'booking', loadChildren: () => import("./common/pages/application/booking/booking.module").then(module => module.BookingModule) },
    { path: '**', component: NotFoundComponent }
];

