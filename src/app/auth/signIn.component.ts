import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {CommonModule} from '@angular/common';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
  styleUrls: ['./signIn.component.css'],
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  goToSignUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }


  onSubmit(): void {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.signIn(username, password).subscribe(response => {
        console.log('Вход успешен', response);
        this.router.navigate(['/tasks']);
      }, error => {
        console.error('Ошибка при входе', error);
      });
    } else {
      console.error('Форма содержит ошибки');
    }
  }

}
