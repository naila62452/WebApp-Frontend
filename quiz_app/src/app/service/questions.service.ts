import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const api_path = 'http://localhost:5000/api/mcqs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }
  addMcqs(mcqsForm: any, topicId: string, typeId: string): Observable<any> {
    let id = localStorage.getItem('id')
    return this.http.post(`${api_path}/create/${id}/${topicId}/${typeId}`, mcqsForm)
  }

  getMcqs() {
    return this.http.get(`${api_path}/`)
  }

  // getImageMcqs(imageName: string) {
  //   return this.http.get(`${api_path}/image?image=${imageName}`, { responseType: 'blob'})
  // }

  getImageMcqs(imageName: string) {
    return this.http.get(`${api_path}/files/${imageName}`, { responseType: 'blob'})
  }
  getMcqsByTopic(topic: any, type: string) {
    // debugger
    let id = localStorage.getItem('id')
    return this.http.get(`${api_path}/getMcqs/${id}/${topic}/${type}`)
  }

  deleteMcqs(id: any) {
    return this.http.delete(`${api_path}/delete/${id}`)
  }

  updateMcqs() {

  }

}
