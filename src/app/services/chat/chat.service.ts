import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChat } from 'src/app/interfaces/chat';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private _rootURL = "http://localhost:8000/api/chat"

  constructor(private _authService: AuthService,private _Http: HttpClient) { }

  private authHeader(token:string):{headers:HttpHeaders}{
     let headers_object = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    let options = {
      headers:headers_object
    };
    return options;
  }

  getUserChatList():Observable<[IChat]>{
    let token = this._authService.getUserData().token;
    return this._Http.get<[IChat]>(`${this._rootURL}/`,this.authHeader(token) );
  }



}

