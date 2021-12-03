import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
}
}
