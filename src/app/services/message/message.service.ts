import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from 'src/app/interfaces/message';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http:HttpClient,private _authService: AuthService) { }
  private _rootURL = "http://localhost:8000/api/message"
  messageList!: IMessage[];
  public listChange: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>(this.messageList);

  private authHeader(token: string): { headers: HttpHeaders } {
    let headers_object = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    let options = {
      headers: headers_object
    };
    return options;
  }

  createMessage(messageData: {chat: string,message: string}):Observable<IMessage>{
    let token = this._authService.getUserData().token;

    return this._http.post<IMessage>(this._rootURL,messageData,this.authHeader(token))
  }

  getMessageList(chat_id: string):Observable<IMessage[]>{
    let token = this._authService.getUserData().token;
    return this._http.get<IMessage[]>(`${this._rootURL}/chat/${chat_id}`,this.authHeader(token))
  }
  updateMessageList(chat_id: string) {
    this.getMessageList(chat_id).subscribe((messages) => {
     this.listChange.next(messages)
   });
 }

}
