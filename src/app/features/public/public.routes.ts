import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UspageComponent } from './pages/uspage/uspage.component';

export default [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'uspage',
    component: UspageComponent,
  },
] as Routes;
