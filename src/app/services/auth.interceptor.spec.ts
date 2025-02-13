import { TestBed } from '@angular/core/testing';
import {HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });

    // Получаем экземпляр интерсептора из TestBed
    authInterceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should intercept requests', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: () => of(new HttpResponse({ status: 200 })) // Мокаем ответ
    };

    authInterceptor.intercept(req, next).subscribe((event: HttpEvent<any>) => {
      // Здесь вы можете добавить проверки для ответа
      expect(event).toBeDefined();
    });
  });
});
