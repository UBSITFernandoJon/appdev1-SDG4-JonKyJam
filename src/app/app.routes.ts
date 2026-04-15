import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Detail } from './pages/detail/detail';
import { About } from './pages/about/about';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'resource/:id',        // ← URL parameter route (required!)
    component: Detail
  },
  {
    path: 'about',
    component: About
  },
  {
    path: '**',                  // ← Wildcard route (required!)
    component: NotFoundComponent
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]   // ← add this line
  }
];