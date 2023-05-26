import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {UserService} from "../../../services/user/user.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {IOrder} from "../../../models/order";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  ticketSearchValue: string;
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];

  constructor(private route:ActivatedRoute,
              private ticketStorage:TicketsStorageService,
              private ticketService: TicketService,
              private userService: UserService) { }

  ngOnInit(): void {

    // first get userInfo
    this.user = this.userService.getUser();

    // init FormGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    });

    //get nearest tours

    this.getNearestTours();

    const routeIdParam = this.route.snapshot.paramMap.get('id'); //for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); //for queryParams

    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId){
      const tickets = this.ticketStorage.getStorage();
      this.ticket = tickets.find((el)=>el.id === paramValueId);
      console.log('this ticket', this.ticket);
    }
  }

  ngAfterViewInit(): void {
    // setCardNumber
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev:any) => {
      this.initSearchTour();
    })
  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  getNearestTours() {
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      console.log('data', data)
      this.toursLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1])
    })
    return this.nearestTours
  }


  initSearchTour(): void{
    if(!this.ticketSearchValue){
      this.getNearestTours();
    }

    const type = Math.floor(Math.random() * this.searchTypes.length);
    // unsubscribe
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    });
  }

  onSubmit(): void {

  }


  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};

    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData.tourId,
      userId: userId,
    }

    this.ticketService.sendTour(postObj).subscribe()
  }

  SelectDate(ev: Event): void {

  }

}
