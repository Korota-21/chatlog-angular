import { Component, Input, OnInit } from '@angular/core';
import { IChat } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent implements OnInit {
  @Input('chat') chat!: IChat
  constructor(private _chatService: ChatService) {

  }

  ngOnInit(): void {

  }

  delete() {
      this._chatService.deleteChat(this.chat._id).subscribe(
        () => {
          this._chatService.updateChatList();
        }
      );

  }
}
