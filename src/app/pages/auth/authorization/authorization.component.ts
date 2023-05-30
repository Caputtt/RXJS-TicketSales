import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/configService/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";




@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inputProp = 'test';

  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  isRememberMe:boolean
  cardNumber: string;
  authTextButton: string;
  useUserCard: boolean = false;


  constructor(public authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              public userService: UserService,
              private http: HttpClient,
  ) {
  }

// router производит сопоставление с маршрутами, которые указаны в модуле, а activatedRoute считывает параметры route
  ngOnInit(): void {
    this.useUserCard = ConfigService.config.useUserCard;
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }

  vipStatusSelected(): void {
    console.log('vipStatusSelected()',event)
  }

  onAuth(ev: Event): void {


    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }

    console.log(authUser);


    this.http.post<{
      access_token: string,
      id: string
    }>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);

      this.router.navigate(['tickets/ticket-list']);

    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error;
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
    });
  }


  }










//   this.http.post<{ access_token: string, id: string }>('http://localhost:49995/users/' + authUser.login)
//   authUser.id = data.id;
//   this.userService.setUser(authUser);
//   const token: string = data.access_token;
//   this.userService.setToken(token);
//   this.userService.setToStore(token);
//
//
//   this.router.navigate(['tickets']);
//
//   }, (err: HttpErrorResponse) => {
//   const serverError = <ServerError>err.error;
//   this.messageService.add({severity:'warn', summary: serverError.errorText});
// });



