import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './Library/library/library.component';
import { LoginComponent } from './Login & Register/Login/login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './Login & Register/Register/register/register.component';
import { AuthenticationGuard } from './Guard/authentication.guard';
import { OrderComponent } from './OrderedBooks/order/order.component';
import { AuthorizationGuard } from './Guard/authorization.guard';
import { OrdersComponent } from './OrderedBooks/All/orders/orders.component';
import { ReturnedComponent } from './OrderedBooks/Return/returned/returned.component';
import { UserslistComponent } from './Login & Register/UsersList/userslist/userslist.component';
import { ManagebooksComponent } from './ManageBooks/managebooks/managebooks.component';
import { ManageCategoriesComponent } from './ManageBooks/managebooks/manage-categories/manage-categories.component';
import { ProfileComponent } from './Login & Register/Profile/profile/profile.component';

const routes: Routes = [
  {
    path:"books/library",component:LibraryComponent,canActivate:[AuthenticationGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'users/order',component:OrderComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:'users/all-orders',component:OrdersComponent,canActivate:[AuthorizationGuard]
  },
  {
    path:'books/return',component:ReturnedComponent,canActivate:[AuthorizationGuard]
  },
  {
    path:'users/list',component:UserslistComponent,canActivate:[AuthorizationGuard]
  },
  {
    path:'manage/books',component:ManagebooksComponent,canActivate:[AuthorizationGuard]
  },
  {
    path:'manage/categories',component:ManageCategoriesComponent,canActivate:[AuthorizationGuard]
  },
  {
    path:'users/profile',component:ProfileComponent,canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
