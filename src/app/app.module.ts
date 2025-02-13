import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './services/auth.interceptor';
import {AuthService} from './auth/auth.service';
import {TaskService} from './tasks/task.service';
import {SignUpComponent} from './auth/signUp.component';
import {SignInComponent} from './auth/signIn.component';
import {JwtModule} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('access_token'),
          allowedDomains: ['localhost:8080'], // замените на ваш домен
          disallowedRoutes: ['localhost:8080/auth/sign-in/'], // замените на ваш маршрут
        },
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi:true},
  AuthService,
  TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
