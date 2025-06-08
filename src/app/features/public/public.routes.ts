import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UspageComponent } from './pages/uspage/uspage.component';
import { NewsComponent } from './pages/news/news.component';

export default [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'uspage',
    component: UspageComponent,
  },
] as Routes;
