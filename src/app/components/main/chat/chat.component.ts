import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IChat } from 'src/app/interfaces/chat';
import { IMessage } from 'src/app/interfaces/message';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessageService } from 'src/app/services/message/message.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat!: IChat
  @ViewChild('chatHistory') chatHistory!: ElementRef;
  MessageList!: IMessage[]
  messageS: string = "";
  my_id: string = "";
  subscribtion!: Subscription;


  constructor(private _chatService: ChatService,
    private _activateRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    private _socketService: SocketService,
    private _messageService: MessageService) {
    this.subscribtion = this._messageService.listChange.subscribe(message => {
      this.MessageList = message;
    })
  }


  ngOnInit(): void {
    this.getChat();
    this.my_id = this._authService.getUserData().user._id
  }


  getChat() {
    this._activateRoute.params.subscribe((params) => {
      this._chatService.getChat(params['id']).subscribe(
        chat => {
          if (!chat)
            this._router.navigate(['/main']);
          this.chat = chat
          this._socketService.joinChat(chat._id)
          this._messageService.updateMessageList(params['id']);
          this._socketService.newMessageListener(params['id'])
          this.scrollToBottom()
        },
        err => console.log(err)
      );
    })
  }

  scrollToBottom(): void {
    if(this.chatHistory)
    this.chatHistory.nativeElement.scrollTop =
      this.chatHistory.nativeElement.scrollHeight;
  }
  getChatID(): string {
    let id = ""
    this._activateRoute.params.subscribe((params) => {
      id = params['id']
    })
    return id;
  }

  addMessage() {
    if (this.messageS == "")
      return

    let body = {
      chat: this.getChatID(),
      message: this.messageS
    }
    this._messageService.createMessage(body).subscribe(
      res => { },
      (err) => console.log(err)
      , () => {
        this._messageService.updateMessageList(body.chat);
        this._socketService.newMessage();
        this.scrollToBottom();
      }
    )
    this.messageS = ""
  }

}
