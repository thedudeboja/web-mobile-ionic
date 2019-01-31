import { Component } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  private email: string;
  private password: string;


  constructor(private authService: AuthenticationService) {

  }

  login(){
      this.authService.login(this.email,this.password);
  }

}
