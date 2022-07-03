import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  email!: string;
  messageDiv = {
    message: "",
    class: "",
    display: false
  };
  constructor(private _router: Router, private _chatService: ChatService) { }

  ngOnInit(): void {
  }

  create() {
    if (!this.email)
      return this.showMessage("Please enter email address", "error");


    this._chatService.createChat(this.email).subscribe(
      chat => {
        this.showMessage("The chat has been created successfully", "success");
      },
      err => this.showMessage(err.error.message, "error"),
      () => {
        this._chatService.updateChatList();
        console.log("hi");

        this._router.navigate(['/main']);

      }
    );
  }
  showMessage(message: string, type: ("error" | "success")) {
    this.messageDiv.display = true;
    this.messageDiv.message = message;
    if (type == "error")
      this.messageDiv.class = "alert-danger";
    else
      this.messageDiv.class = "alert-success";

  }
}
