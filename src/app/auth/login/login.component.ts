import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoadingService } from '../../services/shared/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public formSubmitted = false;


  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    remember: [false],
  });
  loginError: string = '------------------------------';
  public hidePassword = true;
  errorMessage: string = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: UsuarioService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
  ) {}

  onLogin() {
    if (this.loginForm.invalid) {
      return; 
    }
    debugger
    const formData = this.loginForm.value; // Obtén los datos del formulario
    this.loginService.loginUsuario(formData).subscribe({
      next: (response: any) => {
    
        this.loginService.setLoggedInUser(response);
        this.loadingService.hide();
        console.log('Login successful:', response);
      
        localStorage.setItem('userRole', response.rol);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/dashboard'); 
       
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
          
        this.snackBar.open('Credenciales incorrectas.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-primary'],
        });
      
        this.loadingService.hide(); 
      },
    });

  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
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
