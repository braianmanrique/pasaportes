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
  constructor(private router: Router, private fb : FormBuilder, private loginService: UsuarioService){

  }

login() {
  console.log('login')
  this.router.navigateByUrl('/');
  this.loginService.loginUsuario(this.loginForm.value).subscribe(resp => {

  }, (err) => {

  })
}

}
