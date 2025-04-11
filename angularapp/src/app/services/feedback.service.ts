import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  public baseUrl : string = "https://ide-ffdfacdaffdcdebdeaffeeddabbccfeabfadfbfdec.premiumproject.examly.io/proxy/8080/api/feedback";


  constructor(private httpClient : HttpClient) { }

  public createFeedback(feedback : Feedback) : Observable<any>{
    return this.httpClient.post(this.baseUrl, feedback);
  }

  public getAllFeedbacks() : Observable<any>{
    return this.httpClient.get(this.baseUrl);
  }
  
  public updateFeedback(feedbackId: number, feedback : Feedback) : Observable<any>{
    return this.httpClient.put(this.baseUrl+"/"+feedbackId,feedback);
  }

  public deleteFeedback(feedbackId:number) : Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/"+feedbackId);

  }
  public getFeedbackByUserId(userId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/user/"+userId);
  }
}

