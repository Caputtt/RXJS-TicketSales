import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";
import {UserService} from "../user/user.service";


@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient,
              private userService: UserService,
              ) { }

  getTickets(): Observable<ITour[]> {
    this.userService.setToken('user-private-token');
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }
  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }
  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/`)
  }

  // getNearestTicketsById(id: string): Observable<INearestTour[]> {
  //   return this.http.get<INearestTour[]>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/${id}`)
  // }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/`)
  }

  sendTour(data: any): Observable<any> {
    return this.http.post<any>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/locati1on/`, data)
  }
}

