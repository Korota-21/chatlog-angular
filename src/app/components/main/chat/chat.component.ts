import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IChat } from 'src/app/interfaces/chat';
import { IMessage } from 'src/app/interfaces/message';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat!: IChat
  MessageList!: IMessage[]
  messageS: string = "";
  my_id: string = "";
  subscribtion!:Subscription
  constructor(private _chatService: ChatService,
    private _activateRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    private _messageService: MessageService) {
      this.subscribtion = this._messageService.listChange.subscribe(message => {
        this.MessageList = message;
      })
    }

  ngOnInit(): void {
   this.getChat();
   this.my_id = this._authService.getUserData().user._id
   console.log(this.my_id);

   this.getchatHistory();
  }
  getChat(){
    this._activateRoute.params.subscribe((params) => {
      this._chatService.getChat(params['id']).subscribe(
        chat => {
          if (!chat)
            this._router.navigate(['/main']);
          this.chat = chat
        },
        err => console.log(err)
      );
    })
  }
  getchatHistory(){
    this._activateRoute.params.subscribe((params) => {
      this._messageService.getMessageList(params['id']).subscribe(
        messageList => {
          this.MessageList = messageList
          console.log(this.MessageList);
        },
        err => console.log(err)
      );
    })
  }
  delete() {
    this._activateRoute.params.subscribe((params) => {
      this._chatService.deleteChat(params['id']).subscribe(
        () => {
          this._chatService.updateChatList();
          this._router.navigate(['/main']);
        });
    })
  }
  addMessage() {
    if (this.messageS == "")
      return

    this._activateRoute.params.subscribe((params) => {
      let body = {
        chat:params['id'],
        message:this.messageS
      }
      this._messageService.createMessage(body).subscribe(
        (res)=>console.log(res),
        (err) => console.log(err)
        ,() => {
          this._messageService.updateMessageList(body.chat);
        }
      )
    })
    this.messageS = ""
  }



}
