import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  public formSubmitted = false;
  public loginForm :FormGroup = this.fb.group({
    username: ['usuario1', [Validators.required, Validators.email]],
    password: ['contraseña1', Validators.required],
    remember: [false]
  })
  loginError: string = 'hola';
 
  constructor(private router: Router, private fb : FormBuilder, private loginService: UsuarioService){

  }

loginUser() {
  this.loginService.loginUsuario(this.loginForm.value).subscribe({
      next: (UserData) => {
        console.log(UserData)
      },
      error: (errorData) =>{
        console.error(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        console.info("Login completed");
        this.router.navigateByUrl('/');
        this.loginForm.reset();
      }
  })
}

login() {
  this.loginService.login(this.loginForm.value).subscribe(success => {
    if (success) {
      // Redirigir a la página de inicio después del login exitoso
      // Aquí puedes usar el enrutamiento de Angular o realizar alguna acción
      this.router.navigateByUrl('/');
      // this.loginForm.reset();
      console.log("Login exitoso");
    } else {
      console.log("Nombre de usuario o contraseña incorrectos");
    }
  });
}

}
