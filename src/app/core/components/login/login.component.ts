import { AuthService } from '../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(),
  });

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  signIn() {
    this.auth.signIn(this.username.value, this.password.value);
    this.form.reset();
  }

  login() {
    this.auth.login();
  }
}
