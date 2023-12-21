import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailPopupComponent } from '../email-popup/email-popup.component';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user-service.service';
import { user } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!: any;
  savedId!: string;
  constructor(public dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser()!)
  }
  isShow = false;
  groupname = new FormControl('');
  peoplename = new FormControl('');

  submit() {
    this.isShow = !this.isShow;
  }

  openDialog(): void {
    const groupname = this.groupname.value;
    const peoplesname = this.peoplename.value;
    let duplicateValue = false;
    const peopleArray = peoplesname?.split(",");
    const filteredArray = this.removeBlank(peopleArray!);
    let unique: any[] = [];
    filteredArray.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element);
      } else {
        duplicateValue = true;
        return;
      }
    });
    const isValid = peopleArray?.every(element => /^[A-Za-z ]{3,50}$/.test(element));
    if (!isValid) {
      this.snackBar.open("Please Check All Names", "Ok", {
        duration: 3000
      });
    } else if (peopleArray!.length < 3) {
      this.snackBar.open("Less than three members are not allowed", "Ok", {
        duration: 3000
      });
    } else if (duplicateValue) {
      this.snackBar.open("Same Names are not allowed", "Ok", {
        duration: 3000
      });
    } else {
      const saveMember = {
        "groupName": groupname,
        "userId": this.user.id,
        "membersName": peopleArray
      }
      this.userService.saveMember(saveMember).subscribe((res) => {
        this.savedId = res.data;
        if (this.savedId !== null) {
          const dialogRef = this.dialog.open(EmailPopupComponent, {
            data: this.savedId,
            disableClose: true,
            width: '50%',
            height: '65%'
          });

          dialogRef.afterClosed().subscribe(result => {
            this.groupname.reset();
            this.peoplename.reset();
          });
        } else {
          this.snackBar.open(res.message, "OK", { duration: 3000 });
        }
      });
    }
  }
  removeBlank(array: any[]) {
    return array.filter(function (str) {
      return /\S/.test(str);
    });
  }
  findDuplicate(array: any[]) {
    let unique: any[] = [];
    array.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }

}
