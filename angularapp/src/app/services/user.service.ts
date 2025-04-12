import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  
  public apiUrl = "https://ide-ffdfacdaffdcdebdeaffeeddabbccfeabfadfbfdec.premiumproject.examly.io/proxy/8080/api/user"

  public getAllUsers():Observable<any>{
    return this.httpClient.get(this.apiUrl);
  }

  public getProfileById(userId:number):Observable<any>{
    return this.httpClient.get(this.apiUrl + '/' + userId)
  }

  public deleteUser(userId:number):Observable<any>{
    return this.httpClient.delete(this.apiUrl + '/' + userId)
  }
}
