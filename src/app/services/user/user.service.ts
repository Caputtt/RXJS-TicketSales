import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser|null;
  private token: string;

  constructor(private readonly router:Router) { }

  getUser(): IUser|null{
    return this.user;
  };
  setUser(user: IUser|null): void {
    this.user = user;
  };

  setToken(token: string): void {
    this.token = token;
    window.localStorage.setItem('ticketsTour-token', this.token)
  }

  getToken(): string | void {
    if (this.token) {
      return this.token;
    } else {
      const isTokenInStorage = window.localStorage.getItem('ticketsTour-token');
      if (isTokenInStorage) {
        return isTokenInStorage;
      }
    }
  }

  removeUser() {
    this.user = null;
    this.token = '';
    window.localStorage.setItem('ticketsTour-token', this.token)

  };
}
