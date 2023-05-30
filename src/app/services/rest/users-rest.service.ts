import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../../models/users";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersRestService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getUserById(userId: string):Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:3000/users/${userId}`);
  }
}
