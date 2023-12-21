import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl: string;

  constructor(private http: HttpClient) {
    this.emailUrl ="http://localhost:8080/sendMail"
   }

sendEmail(email: any){
  return this.http.post<any>(this.emailUrl, email) 
}
}
