import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admins/admin/admin.component';
import { UserComponent } from './components/users/user/user.component';
import { OrderComponent } from './components/orders/order/order.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { UpdateProfileComponent } from './components/profiles/update-profile/update-profile.component';
import { ProfileComponent } from './components/profiles/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'admin', component: AdminComponent },
  { path: 'users', component: UserComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'user/:id', component: DetailUserComponent },
  { path: 'users/:update', component: UpdateProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: AddUserComponent},
  { path: 'orders', component: OrderComponent },
  { path: 'order/:id', component: OrderDetailComponent},
  { path: 'categories', component: CategoryComponent },
  { path: 'categories/:update', component: UpdateCategoryComponent },
  { path: 'addCategorie', component: AddCategoryComponent },
  { path: 'addOrder', component: AddOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
