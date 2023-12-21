import { Component } from '@angular/core';
import { user } from '../model/user';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupUser!: user;
  signupForm!: FormGroup
  responseData!: any;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/), Validators.min(6)]],
      passwordConfirm: ['', Validators.required],
    });
  }
  ngOnInit() {
    if (this.userService.getUser()) {
      this.router.navigate(['/dashboard'])
    }
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get fullName() { return this.signupForm.get('fullName'); }
  get userName() { return this.signupForm.get('userName'); }
  get passwordConfirm() { return this.signupForm.get('passwordConfirm'); }


  onSubmit() {
    const password1 = this.signupForm.get('password')!.value;
    const passwordCnfrm = this.signupForm.get('passwordConfirm')!.value;
    if (password1 !== passwordCnfrm) {
      this.snackBar.open('Password Does not Match', "OK", {
        panelClass: 'my-custom-snackbar',
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 5000
      });
    } else {
      this.signupUser = {
        username: this.signupForm.get('userName')!.value,
        email: this.signupForm.get('email')!.value,
        password: this.signupForm.get('password')!.value,
        fullName: this.signupForm.get('fullName')!.value
      };
      this.userService.signUp(this.signupUser).subscribe(data => {
        this.responseData = data;
        if (this.responseData.data == null) {
          const message = this.responseData.message.split(';');
          this.snackBar.open(this.responseData.message, 'Ok', {
            panelClass: 'my-custom-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 5000
          });
        } else {
          this.snackBar.open(this.responseData.message, 'Ok', {
            panelClass: 'my-custom-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 5000
          });
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
