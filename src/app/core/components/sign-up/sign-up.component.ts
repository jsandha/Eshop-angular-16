import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  idExists = false;
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required, Validators.maxLength(32)]),
    username: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
    remember: new UntypedFormControl(),
  });
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get name() {
    return this.form.get('name');
  }
  signUp() {
    this.auth
      .signUp(this.name.value, this.username.value, this.password.value)
      .then((x) => {
        if (x) this.idExists = true;
        else this.idExists = false;
      });
  }
}
