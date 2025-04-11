import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';

const routes: Routes = [
  
{ path: 'userNavbar' ,component: UsernavbarComponent ,
children: [
 { path: 'home', component: HomeComponent },
 { path: 'userviewproduct', component: UserviewproductComponent },
 { path: 'userviewfeedback', component: UserviewfeedbackComponent },
 { path: 'uservieworders', component: UserviewordersComponent },
 {path: '', redirectTo:'/userNavbar/home', pathMatch:'full'}],
},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
