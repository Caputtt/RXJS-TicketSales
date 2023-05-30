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
import {MessageService} from "primeng/api";


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
  nearestTours: ITour[];
  toursLocation: ITourLocation[];
  searchText: any;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;


  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  private searchTypes = [1, 2, 3];

  constructor(private route:ActivatedRoute,
              private ticketStorage:TicketsStorageService,
              private ticketService: TicketService,
              private userService: UserService,
              private messageService: MessageService,
              ) { }

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

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      const [nearestToursData, toursLocationData] = data;
      this.toursLocation = toursLocationData;
      this.nearestTours = this.ticketService.transformData(nearestToursData, toursLocationData);
    });

    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;

    if (paramValueId) {
      this.ticketService.getTicketById(paramValueId).subscribe((data) => {
        this.ticket = data
      });
      // const ticketStorage = this.ticketStorage.getStorage();
      // this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      // console.log('this.ticket', this.ticket);
    }
  }


  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    });
  }

  initSearchTour(): void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if(this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation);
    });
  }

  ngOnDestroy() {
    this.searchTicketSub.unsubscribe();
  }

  onSubmit(): void {}

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    // console.log('postData', postData);
    // console.log('this.userForm.getRawValue()', this.userForm.getRawValue());

    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }

    this.ticketService.sendTour(postObj).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Заказ оформлен',
      });
    });
  }

  selectDate(ev: Event): void {}
}
