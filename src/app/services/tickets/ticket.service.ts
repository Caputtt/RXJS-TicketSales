import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {ICustomTicketData, INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours"

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();

  readonly ticketType$ = this.ticketSubject.asObservable(); //1 variant


  constructor(private ticketServiceRest: TicketRestService) { }


/**Способ преобразования данных, полученных с сервера, до подписки - оператор pipe**/
    getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(

      (value) => {
        const singleTours = value.filter((el) => el.type === "single");
        return value.concat(singleTours);
      }

    ));
  }
  /**
   *  вариант доступа к Observable
   */
  // getTicketTypeObservable(): Observable<ITourTypeSelect> {
  //   return this.ticketSubject.asObservable();
  // } //2 variant

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError():Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours():Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation():Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }

  transformData (data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el) => {
      const newEl = <ICustomTicketData>{...el};
      newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {};
      newTicketData.push(newEl);
      console.log(newTicketData)
    })
    return newTicketData;
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }

  sendTour(postData: any) {
    return this.ticketServiceRest.sendTour(postData);

  }
}


