import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { BookingFireworkComponent } from './booking-firework/booking-firework.component';

const routes: Routes = [
    { path: ':id/:content', component: PostComponent },
    { path: '12', component: BookingFireworkComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule {}
