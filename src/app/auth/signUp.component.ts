import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-signUp',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
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
        this.router.navigate(['/auth/sign-in']);
      }, error => {
        console.error('Ошибка при регистрации', error);
      });
    } else {
      console.error('Форма содержит ошибки');
    }
  }

}
