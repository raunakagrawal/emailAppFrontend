import { Component } from '@angular/core';
import { MembersService } from '../service/members.service';
import { UserService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MemberPopupComponent } from '../member-popup/member-popup.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  constructor(private memberService: MembersService, private userService: UserService, private router: Router, private dialog: MatDialog) { }
  user: any;
  groups: any;
  collapsed: Boolean = false;
  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser()!);
    this.memberService.getGroupByUser(this.user.id).subscribe(res => {
      this.groups = res;
    })
  }
  deleteGroup(group: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: group,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.ngOnInit()
      }
    });
  }
  getMembers(group: any) {
    this.memberService.getMembersByGroupId(group.id).subscribe(res => {
      const tabledata: any[] = [];
      res.forEach((element: { memberName: any; accociateMember: any; }) => {
        let drawan;
        if (element.accociateMember !== null) {
          drawan = true;
        } else {
          drawan = false;
        }
        const member = {
          memberName: element.memberName,
          drawn: drawan
        }
        tabledata.push(member);
      });
      const dialogRef = this.dialog.open(MemberPopupComponent, {
        data: tabledata,
        width: '40%'
      });
    })
  }

}
