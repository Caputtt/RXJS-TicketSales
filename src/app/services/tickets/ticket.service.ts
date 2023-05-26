import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {ICustomTicketData, INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours"

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private randomEndpoints = ["nearestTours1.json", "nearestTours2.json", "nearestTours3.json"];

  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); //1 variant

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();


  constructor(private ticketServiceRest: TicketRestService) { }


/**Способ преобразования данных, полученных с сервера, до подписки - оператор pipe**/
    getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();

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

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
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

  sendTour(data: any): Observable<any> {
    return this.ticketServiceRest.sendTour(data);

  }

  getTicketById(id: string): Observable<ITour> {
    return this.ticketServiceRest.getTicketById(id);
  }


}


