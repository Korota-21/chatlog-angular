import { Component, Input, OnInit } from '@angular/core';
import { IChat } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat/chat.service';
import exportFromJSON from 'export-from-json'
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent implements OnInit {
  @Input('chat') chat!: IChat
  constructor(private _chatService: ChatService,private _messageService: MessageService) {

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
  saveChat() {
    this._messageService.getMessageList(this.chat._id).subscribe((messageList) => {

      let data= messageList;

      const fileName = `${this.chat._id}download`
      const exportType = 'json'

      exportFromJSON({ data, fileName, exportType })
    })
  }
}
