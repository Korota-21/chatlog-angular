import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private _socket: Socket, private _authService: AuthService, private _messageService: MessageService) {
    this._socket.on("noUser", () => {
      this.addUser()
    });
  }

  addUser() {
    this._socket.emit('adduser', this._authService.getUserData().user);
  }


  joinChat(chat_id: string) {
    this._socket.emit('JoinChat', chat_id);
  }
  newMessage() {
    this._socket.emit('newMessage');
  }
  newMessageListener(chatId: string) {
    this._socket.on('newMessage', () => {
      this._messageService.updateMessageList(chatId)
      console.log("newMessage recived");

    });
  }

}
