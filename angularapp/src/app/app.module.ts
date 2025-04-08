import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddproductComponent } from './components/adminaddproduct/adminaddproduct.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';

@NgModule({
  declarations: [
    AppComponent,

    AdminaddproductComponent,
    AdminnavbarComponent,
    AdminviewfeedbackComponent,
    AdminviewordersComponent,
    AdminviewproductComponent,
    AdminviewuserdetailsComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent

    RegistrationComponent,
    UseraddcartComponent,
    UseraddfeedbackComponent,
    UserviewordersComponent,
    UserviewproductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
