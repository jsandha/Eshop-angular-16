import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
import { ProductFormComponent } from '../admin/components/product-form/product-form.component';
import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    SharedModule,
    DataTablesModule,
    RouterModule.forChild([

      { path: 'admin/products/new',
      component: ProductFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard] },

      { path: 'admin/products/:id',
      component: ProductFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard] },

      { path: 'admin/orders',
      component: AdminOrdersComponent,
      canActivate: [AuthGuard, AdminAuthGuard] },

     { path: 'admin/products',
      component: AdminProductsComponent,
      canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
