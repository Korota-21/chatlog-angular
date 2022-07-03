import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IChat } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat!: IChat
  constructor(private _chatService: ChatService, private _activateRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._activateRoute.params.subscribe((params) => {
      this._chatService.getChat(params['id']).subscribe(
        chat => {
          if (!chat)
            this._router.navigate(['/main']);
          console.log(chat);
          this.chat = chat
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

}
