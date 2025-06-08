import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';

export default [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
] as Routes;
