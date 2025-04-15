import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { Global } from '../resources/global';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  public baseUrl : string = Global.apiUrl;



  constructor(private httpClient : HttpClient) { }

  public createFeedback(feedback : Feedback) : Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/feedback",feedback);
  }

  public getAllFeedback() : Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/feedback");
  }
  
  public updateFeedback(feedbackId: number, feedback : Feedback) : Observable<any>{
    return this.httpClient.put(this.baseUrl+"/api/feedback/"+feedbackId,feedback);
  }

  public deleteFeedback(feedbackId:number) : Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/api/feedback/"+feedbackId);

  }
  public getFeedbackByUserId(userId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/feedback/user/"+userId);
  }
}


