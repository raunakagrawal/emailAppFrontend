import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  user: any;
  loginUser!: any;
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private userService: UserService, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser()!)
    if (this.user !== null) {
      this.router.navigate(['/dashboard'])
    }
  }

  public login() {
    if (this.email.value == '' || this.password.value == '') {
      this.snackBar.open("Username or Password Cannot be empty", "OK", {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    } else {
      this.loginUser = {
        email: this.email.value!,
        password: this.password.value!
      };
      try {
        this.userService.login(this.loginUser).subscribe(
          res => {
            if (res.data !== null) {
              this.snackBar.open(res.message, 'Ok', {
                panelClass: 'my-custom-snackbar',
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 5000
              });
              this.router.navigate(['/dashboard']).then(() => {
                window.location.reload();
              });
            } else {
              this.snackBar.open(res.message, 'Ok', {
                panelClass: 'my-custom-snackbar',
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 5000
              });
            }
          },
          err => {
            this.snackBar.open("Some Error Occured", 'Ok', {
              panelClass: 'my-custom-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 5000
            });
          }
        );
      }
      catch (err) {
        alert('Something went wrong, try again later!')
      }
    }
  }
}