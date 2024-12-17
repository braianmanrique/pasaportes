import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public formSubmitted = false;
  public loginForm: FormGroup = this.fb.group({
    username: ['adminpass1', [Validators.required, Validators.email]],
    password: ['clave1234', Validators.required],
    remember: [false],
  });
  loginError: string = '------------------------------';

  errorMessage: string = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: UsuarioService
  ) {}

  onLogin() {

    const formData = this.loginForm.value; // Obtén los datos del formulario
    this.loginService.loginUsuario(formData).subscribe({
      next: (response: any) => {
        this.loginService.setLoggedInUser(response);
        console.log('Login successful:', response);
        localStorage.setItem('userRole', response.rol);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/dashboard'); 

      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      },
    });

  }

  isValidField(field: string) {
    return this.loginForm.controls[field].errors;
  }
  getFieldError(field: string): string | null {
    if (!this.loginForm.controls[field]) return null;
    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El ${field} es requerido`;
        case 'email':
          return `Formato incorrecto para el email`;
        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }
}
