import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ChatPlacholderComponent } from '../components/main/chat-placholder/chat-placholder.component';
import { ChatComponent } from '../components/main/chat/chat.component';
import { MainComponent } from '../components/main/main.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth/auth.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '' ,component: HomeComponent },
  { path: 'main', canActivate: [AuthGuard] ,component: MainComponent ,children: [
    // { path: 'create', component: PostCreateComponent },
   {
     path: ':id', component: ChatComponent
   },
   { path: '', component: ChatPlacholderComponent },
 ]},
  { path: 'register', component: RegisterComponent },


  { path: '**', redirectTo: '/', pathMatch: 'full' },
]

@NgModule({
  providers: [AuthService,AuthGuard],
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: "reload"})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
