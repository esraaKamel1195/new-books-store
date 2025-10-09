import { Component, inject } from '@angular/core';
import { DynamicForm } from '@shared/components/form-components/dynamic-form/dynamic-form';
import { Auth } from '@core/services/auth';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [DynamicForm, CardModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(Auth);

  loginFormConfig = [
    {
      type: 'input',
      label: 'Email',
      name: 'email',
      validators: ['required', 'email'],
      errorMessage: 'Enter a valid email',
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password',
      validators: ['required'],
      errorMessage: 'Password is required',
    },
  ];

  login(value: any) {
    this.auth.login(value.email, value.password);
  }
}
