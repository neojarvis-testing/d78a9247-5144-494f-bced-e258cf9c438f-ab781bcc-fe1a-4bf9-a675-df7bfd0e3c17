import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';

@NgModule({
  declarations: [
    AppComponent,
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
