import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([])],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
  ],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
