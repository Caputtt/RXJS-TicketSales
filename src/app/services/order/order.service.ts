import { Injectable } from '@angular/core';
import {IOrder} from "../../models/order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:3000/order'

  constructor(private http: HttpClient) { }

  getAllOrder():Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl);
  }


}
