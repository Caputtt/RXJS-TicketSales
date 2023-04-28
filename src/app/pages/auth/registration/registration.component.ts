import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/configService/config.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  selectedValue: boolean;
  registrationTextButton: string;
  showCardNumber: boolean;
  saveUserInStore: boolean;


  constructor(private  messageService: MessageService,
              private authService: AuthService,
              private userService: UserService,
              ) { }

  ngOnInit(): void {
    this.registrationTextButton = "Зарегистрироваться";
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  saveDataSelected(): void {

  }

  registration(ev: Event): void | boolean {

    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'});
      return false;
    }

    const  userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }

    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj);
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});
      if (this.selectedValue) {
        let userString = JSON.stringify(userObj);
        window.localStorage.setItem('user' + userObj.login, userString)
      }
    } else {
      this.messageService.add({severity: 'warn', summary: 'Пользователь уже зарегистрирован'});
    }
  }

  // removeUsersFromLocalStorage($event: MouseEvent) {
  //   this.userService.removeUsersFromLocalStorage();
  // }

}
