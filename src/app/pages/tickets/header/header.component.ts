import {Component, Input, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() items: MenuItem[];
  @Input() menuType: IMenuType;

  time: Date;
  user: IUser | null;
  private settingsActive = false;
  private timerInterval: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.items = this.initMenuItems();

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.user = this.userService.getUser();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    console.log('ev', ev)
    if (ev['menuType']) {
      this.settingsActive = this.menuType?.type === "extended";
      this.items = this.initMenuItems();
    }
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['ticket-list'],
      },
      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive,
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command: () => {
          this.userService.removeUser()
        }
      },

    ];
  }

}
