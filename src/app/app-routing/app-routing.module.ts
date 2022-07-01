import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { MainComponent } from '../components/main/main.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '' ,component: HomeComponent },
  { path: 'main', canActivate: [AuthGuard] ,component: MainComponent },
  { path: 'register', component: RegisterComponent },


  { path: '**', redirectTo: '/', pathMatch: 'full' },
]

@NgModule({
  providers: [AuthService,AuthGuard],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
