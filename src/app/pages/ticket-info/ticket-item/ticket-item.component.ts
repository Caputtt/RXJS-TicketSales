import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {UserService} from "../../../services/user/user.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;

  nearestTours?: INearestTour[];
  toursLocation?: ITourLocation[];

  @ViewChild('ticketSearchInput') ticketSearchInput: ElementRef;

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
  forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
  console.log('data', data)
  this.nearestTours = data[0];
  this.toursLocation = data[1];
});

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
  }

  ngOnDestroy(): void {
    // if (this.searchTicketSub) this.searchTicketSub.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.userForm)
  }

  SelectDate(ev: Event): void {

  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    this.ticketService.sendTour(postData).subscribe(r=>{
      console.log('response init tour',r);
    });
  }

}
