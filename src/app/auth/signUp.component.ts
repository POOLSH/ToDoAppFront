import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';

@Component({
  selector: 'app-signUp',
  imports: [

    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    });
  }

  goToSignIn(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { username, email, password } = this.signUpForm.value;
      this.authService.signUp(username, email, password).subscribe(response => {
        console.log('Регистрация успешна', response);
        if (response.token) {
          this.authService.saveToken(response.token);
        }
        this.router.navigate(['/auth/sign-in']); // Перенаправление на страницу входа
      }, error => {
        console.error('Ошибка при регистрации', error);
      });
    } else {
      console.error('Форма содержит ошибки');
    }
  }
}
