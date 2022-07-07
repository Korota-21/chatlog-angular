import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { CreateComponent } from './components/main/create/create.component';
import { ChatListComponent } from './components/main/chat-list/chat-list.component';
import { ChatPlacholderComponent } from './components/main/chat-placholder/chat-placholder.component';
import { ChatHeaderComponent } from './components/main/chat/chat-header/chat-header.component';
import { ChatComponent } from './components/main/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './services/chat/chat.service';
import { MessageService } from './services/message/message.service';
import { SocketService } from './services/socket/socket.service';
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainComponent,
    ChatListComponent,
    ChatComponent,
    ChatPlacholderComponent,
    CreateComponent,
    ChatHeaderComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [AuthService,ChatService,MessageService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
