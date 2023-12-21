import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { user } from '../model/user';
@Injectable()
export class UserService {

  private loginUrl: string;
  private signupUrl: string;
  private saveMembersUrl: string;

  constructor(private http: HttpClient, private router: Router) {

    this.loginUrl = 'http://localhost:8080/users/login';
    this.signupUrl = 'http://localhost:8080/users/create';
    this.saveMembersUrl = 'http://localhost:8080/members/save'
  }
  login(loginUser: any){
    const response =  this.http.post<any>(this.loginUrl, loginUser)
      .pipe(
        tap(res => {
          if(res.data!== null){
            const user = {
              id: res.data.id,
              username: res.data.userName,
              email: res.data.email,
              fullname: res.data.fullName
            }
          localStorage.setItem('user', JSON.stringify(user));
          }
        }),
        catchError(this.handleError)
      );
      return response;
  }
  logout() {
    localStorage.removeItem('user');
  }

  signUp(SignUpUser: user){
    return this.http.post<user>(this.signupUrl, SignUpUser);
  }

  handleError(error: HttpErrorResponse) {
    return error.error.status;
  }
  getUser() {
    return localStorage.getItem('user');
  }

  saveMember(members:any){
    return this.http.post<any>(this.saveMembersUrl, members)
  }
}

