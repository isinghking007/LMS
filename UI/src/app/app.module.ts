import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Header & Footer/Footer/footer/footer.component';
import { HeaderComponent } from './Header & Footer/Header/header/header.component';
import { MaterialModule } from './Material/material/material.module';
import { SidenavComponent } from './SideNav/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LibraryComponent } from './Library/library/library.component';
import { RegisterComponent } from './Login & Register/Register/register/register.component';
import { LoginComponent } from './Login & Register/Login/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import { OrderComponent } from './OrderedBooks/order/order.component';
import { OrdersComponent } from './OrderedBooks/All/orders/orders.component';
import { ReturnedComponent } from './OrderedBooks/Return/returned/returned.component';
import { UserslistComponent } from './Login & Register/UsersList/userslist/userslist.component';
import { ManagebooksComponent } from './ManageBooks/managebooks/managebooks.component';
import { ManageCategoriesComponent } from './ManageBooks/managebooks/manage-categories/manage-categories.component';
import { ProfileComponent } from './Login & Register/Profile/profile/profile.component'
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    LibraryComponent,
    RegisterComponent,
    LoginComponent,
    OrderComponent,
    OrdersComponent,
    ReturnedComponent,
    UserslistComponent,
    ManagebooksComponent,
    ManageCategoriesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return localStorage.getItem('access_item');
        },
        allowedDomains:['localhost : 7137'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
