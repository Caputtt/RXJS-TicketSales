import { Injectable } from '@angular/core';
import {Observable, Subject, take} from "rxjs";
import {Settings} from "../../models/settings";
import {ITour} from "../../models/tours";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: Subject<Settings> = new Subject<Settings>();

  constructor(

  ) { }

  loadUserSettings(): Observable<Settings> {
    const settingsObservable = new Observable<Settings>((subscriber)=>{
      const settingsData: Settings = {
        saveToken:true
      };
      subscriber.next(settingsData);
    });
    return settingsObservable;
  }
//subject
  loadUserSettingsSubject(data: Settings): any {
    this.settingsSubject.next(data);
  }

  getSettingsSubjectObservable(): Observable<Settings> {
    return this.settingsSubject.asObservable();
  }

  // getStatisticUser(): Observable<IStatisticUser[]> {
  //   return this.statisticRestService.getStatisticUser();
  // }
}
