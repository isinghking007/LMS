import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

export interface TableElement {
  name: string;
  value: string | undefined;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  dataSource: TableElement[] = [];
  columns: string[] = ['name', 'value'];

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    let user = this.service.getTokenUserInfo();

    this.dataSource = [
      { name: 'Name', value: user?.firstName + ' ' + user?.lastName },
      { name: 'Email', value: user?.email ?? '' },
      { name: 'Mobile', value: user?.mobile },
      { name: 'Blocked', value: this.blockedStatus() },
      { name: 'Active', value: this.activeStatus() },
    ];
  }
  blockedStatus(): string {
    let bloked = this.service.getTokenUserInfo()!.blocked;
    return bloked ? 'YES, you are BLOCKED' : 'NO, you are not BLOCKED!';
  }

  activeStatus(): string {
    let active = this.service.getTokenUserInfo()?.active;
    return active
      ? 'YES, your account is ACTIVE'
      : 'NO, your account is not ACTIVE!';
  }

}
