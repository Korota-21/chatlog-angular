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
  chat!:IChat
  constructor(private _chatService: ChatService,private _activateRoute: ActivatedRoute, private _route:Router) { }

  ngOnInit(): void {
    this._activateRoute.params.subscribe((params) => {
       this._chatService.getChat(params['id']).subscribe(
        chat => this.chat = chat,
        err => console.log(err)
      );
      })
  }

}
