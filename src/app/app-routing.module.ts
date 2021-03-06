import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AuthGuard } from 'shared/common/service/guard/auth-guard.service';
import { AdminAuthGuard } from 'shared/common/service/guard/admin-auth.service';


const routes: Routes = [
  //general routes
  {
    path:'',
    redirectTo:'products',
    pathMatch:'full'
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'shopping-cart',
    component:ShoppingCartComponent
  },

//order routes
  {
    path:'order-success/:id',
    component:OrderSuccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'my/orders',
    component:MyOrdersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'check-out',
    component:CheckOutComponent,
    canActivate:[AuthGuard]
  },

  //Admin routes
  {
    path:'admin/products/new',
    component:ProductFormComponent,
    canActivate:[AuthGuard, AdminAuthGuard]
  },
  {
    path:'admin/products/:id',
    component:ProductFormComponent,
    canActivate:[AuthGuard, AdminAuthGuard]
  },
  {
    path:'admin/products',
    component:AdminProductsComponent,
    canActivate:[AuthGuard, AdminAuthGuard]
  },
  {
    path:'admin/orders',
    component:AdminOrdersComponent,
    canActivate:[AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
