import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _socketService: SocketService) {
   this._socketService.addUser()
   }

  ngOnInit(): void {
  }

}
