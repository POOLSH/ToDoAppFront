import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of, switchMap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return this.authService.refreshToken().pipe(
        switchMap(() => of(true)), // Если токен обновлен — разрешаем вход
        catchError(() => {
          this.router.navigate(['/auth/sign-in']);
          return of(false);
        })
      );
    }
  }
}
