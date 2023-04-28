import { Component, OnInit } from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/configService/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop: string;

  constructor(private testing: ObservableExampleService,
              private config: ConfigService,
              ) {
  }

  ngOnInit() {
    // this.config.configLoad();

    /**Observable*/
    //first subscriber
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {
      console.log('first myObservable data', data)
    });

    //second subscriber
    myObservable.subscribe((data) => {
      console.log('second myObservable data', data)
    });

    /**Subject*/
    const mySubject = this.testing.getSubject();
    // mySubject.subscribe((data) => {
    //   // console.log('first data subject from app', data)
    // });
    // mySubject.subscribe((data) => {
    //   // console.log('second data subject from app', data)
    // });


    //send subjectData
    mySubject.next('subject value from app');
    //send subjectData
    mySubject.next('subject value1 from app');

    /*Behavior Subject*/
    const myBehavior = this.testing.getBehaviorSubject();
    // myBehavior.subscribe((data) => {
    //   console.log('first data behaviorSubject', data)
    // });

    myBehavior.next('new data from behaviorSubject from app');
    myBehavior.next('new data1 from behaviorSubject from app');

  }

}
