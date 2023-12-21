import { Component , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  user: any;

  constructor(public router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser()!);
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
