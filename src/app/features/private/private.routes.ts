import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from '../../core/guards/auth.guard';
import { AuditComponent } from './pages/audit/audit.component';
import { MoreComponent } from './pages/more/more.component';


export default [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'audit',
    canActivate: [authGuard],
    component: AuditComponent,
  },
  {
    path: 'more/:id',
    canActivate: [authGuard],
    component: MoreComponent,
  }
] as Routes;
