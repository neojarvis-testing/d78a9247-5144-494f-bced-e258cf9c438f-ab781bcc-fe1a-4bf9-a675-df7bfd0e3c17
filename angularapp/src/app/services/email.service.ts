import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../models/email.model';
import { Observable } from 'rxjs';
import { Global } from '../resources/global';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public apiUrl = Global.apiUrl +"/api/mail/send";

  constructor(private httpClient:HttpClient) { }

  sendEmail(data:Email):Observable<any>{
    const headers = { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' };
    return this.httpClient.post(this.apiUrl , data ,{responseType:'text'});
  }
  


}
