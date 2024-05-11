import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFireworkComponent } from './booking-firework/booking-firework.component';

const routes: Routes = [
    { path: 'firework', component: BookingFireworkComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookingRoutingModule {}
