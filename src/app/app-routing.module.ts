import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { MembresiaComponent } from "./pages/membresia/membresia.component";
import { AdministradoresComponent } from "./pages/administradores/administradores.component";
const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'home',component: HomeComponent,children:[
    {path:'admin',component:AdministradoresComponent},
    {path:'memb',component: MembresiaComponent},
    {path:'', redirectTo:"memb", pathMatch:"full"},
    {path:'**', redirectTo:"memb" , pathMatch:"full"}
  ]},
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"**",redirectTo:"/login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
