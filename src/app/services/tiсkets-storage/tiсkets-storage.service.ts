import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketStorage:ITour[] = [];

  constructor() { }

  getStorage(): ITour[] {
    return this.ticketStorage;
  }

  setStorage(data:ITour[]): void {
    this.ticketStorage = data;
  }

}
