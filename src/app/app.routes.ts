import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.default),
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./features/public/public.routes').then((m) => m.default),
  },
  {
    path: '**',
    redirectTo: '/public/home',
  },
];
