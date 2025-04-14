import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdminaddproductComponent } from './components/adminaddproduct/adminaddproduct.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
 
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
 
 
  { path: 'userNavBar' ,component: UsernavbarComponent ,
  canActivate: [UserAuthGuard], 
  children: [
    { path: 'home', component: HomeComponent },
    {path:'cart', component:UseraddcartComponent},
    { path: 'userviewproduct', component: UserviewproductComponent },
    { path: 'userviewfeedback', component: UserviewfeedbackComponent },
    { path: 'useraddfeedback', component: UseraddfeedbackComponent},
    { path: 'uservieworders', component: UserviewordersComponent },
    {path: '', redirectTo:'/userNavBar/home', pathMatch:'full'}]
  },
  {path:'adminNavBar',
  component: AdminnavbarComponent,
  canActivate: [AdminAuthGuard], 
   children: [
    { path: 'addProduct', component: AdminaddproductComponent },
    { path: 'adminViewProduct', component: AdminviewproductComponent },
    { path: 'adminViewOrders', component: AdminviewordersComponent },
    {path:'home', component:HomeComponent},
    {path:'adminFeedback', component:AdminviewfeedbackComponent},
    {path:'adminViewUserDetails', component:AdminviewuserdetailsComponent},
    {path:'', redirectTo:'/adminNavBar/home', pathMatch:'full'}
    ],
  },
  {path:'**', component:LoginComponent}
 
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }