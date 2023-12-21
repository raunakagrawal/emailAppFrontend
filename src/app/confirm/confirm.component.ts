import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';
import { MembersService } from '../service/members.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<HistoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private memberService:  MembersService , private snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(){
    this.memberService.deleteGroup(this.data.id).subscribe(
      res=> {
        this.snackBar.open(res.message,"",{duration:3000});
        this.dialogRef.close(true);
      }
    )
  }
}
