import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {UserService} from "../user/user.service";
import {AuthRestService} from "../rest/auth-rest.service";
import {Observable} from "rxjs";


export type AuthStatus = {
  status:boolean;
  message:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usersStorage: IUser[] = [];


  constructor(private userService:UserService,
              private authRestService:AuthRestService,) {
    this.checkUsersInStorage();
    this.checkAuthInStorage();
  }

  checkUser(user:IUser):Observable<any>{
    return this.authRestService.checkUserRest(user)
  }

  changePassword(oldPas:string,newPas:string): boolean {
    const user = this.userService.getUser();
    if(!user || user.psw!=oldPas) return false;
    user.psw=newPas;
    this.saveUserToLocalStorage(user);
    return true;
  }


  setUser(user:IUser):AuthStatus{
    if (!this.isUserExist(user) && user?.login){
      this.usersStorage.push(user);
      return {status:true,message:'Ok'};
    }
    return {status:false,message:'Пользователь зарегистрирован в системе'};
  }

  isUserExist(user:IUser): boolean {
    return Boolean(this.usersStorage.find(x=>x.login==user.login))
  }

  saveUserToLocalStorage(user:IUser): any {
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
    return {status: true, message: 'Пользователь успешно сохранен'};
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
  logout() {
    this.userService.setUser(null);
  }
}
