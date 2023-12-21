import { Component, Inject, ViewChild ,AfterViewInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.css']
})
export class MemberPopupComponent implements AfterViewInit {

  constructor(public dialogRef: MatDialogRef<HistoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _liveAnnouncer: LiveAnnouncer) { }

  displayedColumns: string[] = ['name', 'drawn'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngAfterViewInit() {
    
    this.dataSource.sort = this.sort;
  }
  sortData(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}