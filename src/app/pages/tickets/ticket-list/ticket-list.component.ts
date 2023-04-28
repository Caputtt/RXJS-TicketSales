import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {Subscription} from "rxjs";
// import {debounceTime, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tourWrap',{read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearchInput') ticketSearchInput: ElementRef;

  tickets: ITour[];
  ticketsCopy: ITour[];

  ticketsFiltered: ITour[]=[];
  ticketsCount: number = 0;
  ticketsFilteredCount: number = 0;

  inputSearch: string;

  // searchTicketSub:Subscription;
  // // ticketSearchValue: string;
  //
  //
  tourUnsubscription: Subscription;


  constructor(private ticketService: TicketService,
              private ticketsStorage: TicketsStorageService,
              private router: Router) { }


    ngOnInit(): void {
    this.ticketService.getTickets()
      .subscribe(
      (data) => {
            this.tickets = data;

            this.ticketsCopy = [...this.tickets];

            this.ticketsStorage.setStorage(data);

            this.ticketsFiltered = [...data];
            this.ticketsCount=this.tickets.length;
            this.ticketsFilteredCount=this.ticketsCount;


      }
    )
    this.tourUnsubscription = this.ticketService.ticketType$
      .subscribe((data: ITourTypeSelect) => {
      console.log('data', data)

      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
      }
        this.ticketsFiltered = [...this.tickets];

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

    setTimeout(() => {
      this.blockDirective.updateItems();
      this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
     });
    });
  }

    ngAfterViewInit(): void {
     // const fromEventObserver = fromEvent(this.ticketSearchInput.nativeElement,'keyup');
     //
     // this.searchTicketSub = fromEventObserver.pipe(
     //
     //    debounceTime(200)).subscribe((ev: any)=>{
     //      if (this.ticketSearchValue) {
     //        this.tickets = this.ticketsCopy.filter((el) => el.name.includes(this.ticketSearchValue));
     //      } else {
     //        this.tickets = [...this.ticketsCopy];
     //      }
     //    });
  }

  ngOnDestroy() {
    this.tourUnsubscription.unsubscribe();
    // this.searchTicketSub.unsubscribe();
  }

  /**Метод, реализующий переход на страницу выбранного тура*/
  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]);
  }

  /**Метод, реализующий поиск туров по названию*/
  searchTickets(ev:Event): void {
    const text = (ev?.target as HTMLInputElement).value;

    if (text == '' || text == undefined) {
      this.ticketsFiltered = [...this.ticketsStorage.getStorage()];
      this.ticketsFilteredCount = this.ticketsFiltered.length;
      return;
    }

    this.ticketsFiltered = this.ticketsStorage.getStorage().filter(
      t => t.name.toUpperCase().includes(text.toUpperCase()) || t.description.toUpperCase().includes(text.toUpperCase())
    );
    this.ticketsFilteredCount=this.ticketsFiltered.length;
  }



  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #fff0c4')
    this.blockDirective.initStyle(0);
  }

  // /**Метод, реализующий вывод сообщения, если ничего не найдено при поиске*/
  // undefinedSearchTickets() {
  //   if (this.ticketsFilteredCount === 0) {
  //     return;
  //   }
  // }
}
