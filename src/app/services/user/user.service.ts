import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser|null;
  private token: string|null;

  constructor(private readonly router:Router) { }

  getUser(): IUser|null{
    return this.user;
  }

  setUser(user: IUser|null): void {
    this.user = user;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    // if (this.token) {
      return this.token;
    // } else {
    //   const isTokenInStorage = window.localStorage.getItem('userToken');
    //   if (isTokenInStorage) {
    //     return isTokenInStorage;
    //   }
    // }
  }
  setToStore(token: string) {
    window.localStorage.setItem("userToken", token);
  }

  getFromStore() {
    return window.localStorage.getItem('userToken');
  }

  getAllToken(): string | null {
    if (this.token) {
      return this.token;
    } else {
      return this.getFromStore()
    }
  }


  removeUser(): void {
    this.user = null;
    this.token = null;
    window.localStorage.removeItem('userToken')

  }

  updateUser(user: IUser): void{
    this.user = user;
  }
}
