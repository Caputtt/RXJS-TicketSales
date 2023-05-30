import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(
    private readonly http:HttpClient,
  ) { }


  saveUserRest(user:IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users/', user)
  }

  checkUserRest(user:IUser): Observable<any> {
    return this.http.post<IUser>(`http://localhost:3000/users/${user.login}`, user)
  }
}
