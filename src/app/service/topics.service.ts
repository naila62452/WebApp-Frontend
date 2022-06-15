import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
const api_path = `${environment.web_URL}/api/topic`;

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private http: HttpClient) { }


  addTopic(topicForm: any, subId: string, ageId: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.post(`${api_path}/create/${id}/${subId}/${ageId}`, topicForm)
  }

  topicNameCheck(topic: any): Observable<any> {
    console.log(`${api_path}/topicName/${topic}`)
    return this.http.get(`${api_path}/topicName/${topic}`);
  }

  getTopicByAgeId(subject: string, ageId: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}/${subject}/${ageId}`)
  }

  getTopicBySubject(subject: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}/${subject}`)
  }

  getTopicByTopicId(topic: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/getTopic/${id}/${topic}`)
  }
  getAllTopicData(id: string) {
    return this.http.get(`${api_path}/getByTopic/${id}`)
  }
  deleteTopic(id: string): Observable<any> {
    return this.http.delete(`${api_path}/delete/${id}`, { responseType: 'text' })
  }
  
  // searchTopic(data: any): Observable<any> {
  //   return this.http.get(`${api_path}/search?topic=${data}`)
  // }
}
