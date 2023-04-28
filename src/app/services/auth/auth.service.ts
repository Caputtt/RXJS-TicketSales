import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];


  constructor(private userService:UserService) {
    this.checkUsersInStorage();
    this.checkAuthInStorage();
  }

  checkUser(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    let isUserSavedInStore = window.localStorage.getItem("user_"+user?.login);
    let userInStore: IUser = <IUser>{};

    if (isUserSavedInStore) {
      userInStore = JSON.parse(isUserSavedInStore);
    }

    if (isUserExists) {
      return isUserExists.psw === user.psw;
    } else if (userInStore?.login) {
      return userInStore.psw === user.psw;
    }
    return false;
  }

  changePassword(oldPas:string,newPas:string): boolean {
    const user = this.userService.getUser();
    if(!user || user.psw!=oldPas) return false;
    user.psw=newPas;
    this.saveUserToLocalStorage(user);
    return true;
  }

  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user);
    }

  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    return !!isUserExists;
    }

  saveUserToLocalStorage(user:IUser): void {
    const users:IUser[]=[];
    const usersJsonString = window.localStorage.getItem('users');

    if (usersJsonString){
      const usersJson:IUser[] = JSON.parse(usersJsonString)??[];
      usersJson.forEach(item=>users.push(item));
    }
    const updateIndex = users.findIndex(u=>u.login==user.login);
    if (updateIndex!=-1){
      users.splice(updateIndex,1,user);
    } else {
      users.push(user);
    }

    window.localStorage.setItem('users',JSON.stringify(users));
  }

  removeUsersFromLocalStorage(): void {
    window.localStorage.removeItem('users');
  }

  rememberUser() {
    window.localStorage.setItem('user',JSON.stringify(this.userService.getUser()));
  }
  removeUserFromStorage() {
    window.localStorage.removeItem('user');
  }

  checkAuthInStorage(){
    const userJsonString = window.localStorage.getItem('user');
    if (userJsonString){

      this.userService.setUser(JSON.parse(userJsonString));
    }
  }
  checkUsersInStorage(){
    const usersJsonString = window.localStorage.getItem('users');
    if (usersJsonString) {
      this.usersStorage = JSON.parse(usersJsonString) ?? [];
    }
  }
}
