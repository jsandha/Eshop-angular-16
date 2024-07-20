import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
import { EditOrdersComponent } from './components/edit-orders/edit-orders.component';
import { NgModule } from '@angular/core';
import { ProductFormComponent } from '../admin/components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },

      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },

      {
        path: 'admin/orders/:id',
        component: EditOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },

      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },

      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
    ]),
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    EditOrdersComponent,
  ],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
