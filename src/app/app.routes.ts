import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/pages/general/not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import("./common/pages/application/home/home.module").then(module => module.HomeModule) },
    { path: 'post', loadChildren: () => import("./common/pages/application/post/post.module").then(module => module.PostModule) },
    { path: '**', component: NotFoundComponent }
];

