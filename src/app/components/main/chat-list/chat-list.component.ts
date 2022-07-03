import { Component, OnInit } from '@angular/core';
import { IChat } from 'src/app/interfaces/chat';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats!: IChat[]
  subscribtion!: Subscription;


  constructor(private _chatService: ChatService, private _authService: AuthService) {
    this.subscribtion=this._chatService.listChange.subscribe(chatList =>{this.chats = chatList;
    console.log("hi from chat list")
    })//عشان يتغير مع تغير القيمة في السيرفيس

    this._chatService.getUserChatList().subscribe(
      (chatList) => {
        this.chats = this.deleteAuthUser(chatList)
      }
    );


  }

  ngOnInit(): void {

  }
  deleteAuthUser(chatList: IChat[]): IChat[] {
    let authUserId = this._authService.getUserData().user._id;

    chatList.forEach(chat => {
      chat.users = chat.users.filter(user => {
        return user._id !== authUserId
      })
    }
    )
    return chatList
  }
}
