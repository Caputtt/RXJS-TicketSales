import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours"

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); //1 variant


  constructor(private ticketRestService: TicketRestService) { }

    updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }
/**Способ преобразования данных, полученных с сервера, до подписки - оператор pipe**/
    getTickets(): Observable<ITour[]> {
    return this.ticketRestService.getTickets().pipe(map(

      (value) => {
        const singleTours = value.filter((el) => el.type === "single");
        return value.concat(singleTours);
      }

    ));
  }

  getError():Observable<any> {
    return this.ticketRestService.getRestError();
  }

  getNearestTours():Observable<INearestTour[]> {
    return this.ticketRestService.getNearestTickets();
  }
  // getNearestTicketsById(id:string):Observable<INearestTour[]> {
  //   return this.ticketRestService.getNearestTicketsById(id);
  // }

  getToursLocation():Observable<ITourLocation[]> {
    return this.ticketRestService.getLocationList();
  }

  /**
   *  вариант доступа к Observable
   */
  // getTicketTypeObservable(): Observable<ITourTypeSelect> {
  //   return this.ticketSubject.asObservable();
  // } //2 variant

  sendTour(postData: any) {
    return this.ticketRestService.sendTour(postData);

  }
}


