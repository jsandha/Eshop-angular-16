import { AdminAuthGuardService as AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AdminModule } from './admin/admin.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ShopEffects } from './store/shopEffects';
import { ShopFeatures } from './store/shop';
import { ShoppingModule } from './shopping/shopping.module';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import store from './store/configurestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(store),
    EffectsModule.forRoot([ShopEffects]),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
