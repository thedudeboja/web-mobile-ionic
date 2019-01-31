///<reference path="../../environments/environment.ts"/>
import {Injectable} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Md5} from 'ts-md5/dist/md5';



@Injectable()
export class AuthenticationService {

  private fileUrl;
  private token;
  private user;
  private md5 = new Md5();


  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.token) {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
      }
    }
    this.fileUrl = environment.api_url;
  }

  generateBearerToken(): string {
    return 'Bearer ' + this.token.access_token;
  }


  login(email: string, password: string) {

    const body = {
      'client_id': environment.api_key,
      'client_secret': environment.api_secret,
      'login': email,
      'password': this.md5.appendStr(password).end()
    };

    this.http
      .post(`${environment.api_url}`, body)
      .subscribe(response => {

        this.token = response;

        localStorage.setItem('token', this.generateBearerToken());
      }, _  => {}, () => this.router.navigateByUrl('/home'));

  }

  getAuthToken() {
    return this.token;
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser-GA');
    localStorage.removeItem('token');
  }
}
