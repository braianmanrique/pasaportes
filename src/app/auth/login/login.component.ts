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
    email: ['bm', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    remember: [false]
  })
  loginError: string = 'hola';
  constructor(private router: Router, private fb : FormBuilder, private loginService: UsuarioService){

  }

login() {
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

}
