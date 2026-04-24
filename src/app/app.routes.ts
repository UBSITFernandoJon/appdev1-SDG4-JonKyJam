import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home';

import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { DetailComponent } from './pages/detail/detail';
import { AboutComponent } from './pages/about/about';
import { Login } from './pages/login/login';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canDeactivate: [unsavedChangesGuard]  // ← add this
  },
  {
    path: 'resource/:id',        // ← URL parameter route (required!)
    component: DetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',                  // ← Wildcard route (required!)
    component: NotFoundComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]   // ← add this line
  },
  {
    path: 'login',
    component: Login
  }
];