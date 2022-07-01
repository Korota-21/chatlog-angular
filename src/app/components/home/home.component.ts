import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';
import * as AppUtil from "../../common/app.util"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: IUser;
  constructor( public _authService: AuthService,private _router: Router) {
    if(this._authService.isUserLoggedIn()){
    this.user= this._authService.getUserData().user

    }
  }

  ngOnInit(): void {
  }
  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
