import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MembersService } from '../service/members.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT, DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-match-generator',
  templateUrl: './match-generator.component.html',
  styleUrls: ['./match-generator.component.css']
})
export class MatchGeneratorComponent implements OnInit {
  isDisabled: boolean = true;
  isShow: boolean = true;
  allMembers!: any;
  id!: string;
  expiry!: string;
  membersWithoutMatch: any;
  selectedName = new FormControl('');
  randomMember: any = "";
  group: any;
  constructor(private route: ActivatedRoute, private memberService: MembersService, private snackBar: MatSnackBar, @Inject(DOCUMENT) document: Document, private datePipe: DatePipe) { }
  orderby!: string;

  async ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.id = params.get("param")!;
      this.expiry = params.get("ex")?.toString()!;
      let decExpiryDate = CryptoJS.AES.decrypt(this.expiry, 'secret key 123').toString(CryptoJS.enc.Utf8);

      const decDate: number = +decExpiryDate
      const todaydate = Date.now();
      const diffTime = decDate - todaydate;

      if (diffTime > 0) {
        this.memberService.getGroup(this.id!).subscribe(res => {
          this.group = res
          if (this.group) {
            this.memberService.getMembers(this.id!).subscribe(res => {
              this.allMembers = res
              const memberArray = this.allMembers.filter((Object: any) => {
                return Object.selected == null;
              });
              if (memberArray.length <= 0) {
                this.snackBar.open("Everyone Selected There Match", "OK", {
                  duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                });
                this.isDisabled = true;
              }
            });
          }
        });
      }
    });
  }
  submit() {
    const selectedId = this.selectedName.value;
    let memberArray = this.allMembers.filter((Object: any) => {
      return Object.id !== selectedId && Object.selected == null;
    });
    var i = 30;
    var n = 0;
    const resultBox = document.getElementById('results');
    const outerBox = document.getElementById('outerBox');
    this.isShow = false;

    var myInterval = setInterval(() => {
      if (i >= 0) {
        this.randomMember = this.allMembers[Math.floor(Math.random() * this.allMembers.length)]
        resultBox!.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);;
        i--;
      } else {
        this.randomMember = memberArray[Math.floor(Math.random() * memberArray.length)]
        resultBox!.style.backgroundColor = '#fff'
        outerBox!.style.backgroundImage = 'url(/assets/sunburst.svg)';
        outerBox!.style.animation = 'rotation 1s linear infinite';
        clearInterval(myInterval);
        const member = {
          selectedId: selectedId,
          matchedMember: this.randomMember.memberName,
          groupId: this.randomMember.groupId
        }
        this.memberService.saveMatch(member).subscribe(data => {
        })
        this.isDisabled = true;
      }
    }, 50);
  }
  check(e: any) {
    const selectedMember = this.allMembers.filter((Object: any) => {
      return Object.id == e.value;
    });
    if (selectedMember[0].accociateMember !== null) {
      this.snackBar.open("You Have Already Selected Your Match", "OK", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
}