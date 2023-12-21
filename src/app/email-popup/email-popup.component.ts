import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormControl } from '@angular/forms';
import { EmailService } from '../service/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.css']
})
export class EmailPopupComponent {
  link!: string;
  email!: any;
  recipient = new FormControl('');
  message = new FormControl('');
  loading = false;
  isValid = false;
  checkEmail = false;
  constructor(private snackbar: MatSnackBar, public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private emailService: EmailService) { }

  ngOnInit() {
    const today: number = Date.now();
    const nextdate = today + 12*60*60*1000;
    const encDate = CryptoJS.AES.encrypt((nextdate).toString(), 'secret key 123').toString();
    this.link = "http://localhost:4200/match-maker?param=" + encodeURIComponent(this.data) + "&ex=" + encodeURIComponent(encDate);
  }

  send() {
    this.loading = true;
    const message = this.message.value;
    const recipient = this.recipient.value;
    const subject = "Congratulations You are invited to choose your match.";
    let recipientArray = recipient?.split(',');
    recipientArray = this.removeBlank(recipientArray!);

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    this.isValid = recipientArray.every(email => regex.test(email));

    if (!this.isValid || recipientArray.length <= 0) {
      this.checkEmail = true;
      this.loading = false;
    } else {
      this.checkEmail = false;
      this.email = {
        recipient: recipientArray,
        subject: subject,
        msgBody: message + "\n Link: " + this.link
      }
      this.emailService.sendEmail(this.email).subscribe(data => {
        if (data.status == 200) {
          this.snackbar.open(data.message, "OK", {
            duration: 3000
          });
          this.message.reset();
          this.recipient.reset();
          this.dialogRef.close();
        } else {
          this.snackbar.open(data.message, "OK", {
            duration: 3000
          });
          this.loading = false;
        }
      })
    }
  }
  removeBlank(array: any[]) {
    return array.filter(function (str) {
      return /\S/.test(str);
    });
  }
}
