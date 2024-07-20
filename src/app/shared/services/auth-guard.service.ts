import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService  {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

canActivate(route, state: RouterStateSnapshot){
 return this.auth.user$.pipe(map(user => {
  if (user) return true;

this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}}); // it navigate to login page but also add returnUrl?
return false;
      }));
  }
}
