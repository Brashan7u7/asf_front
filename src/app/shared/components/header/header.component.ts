import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(public authService: AuthService, private router: Router) {
    this.authService.sessionStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/public/home']);
  }
}
