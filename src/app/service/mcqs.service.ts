// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// const api_path_mcqs = `${environment.web_URL}/api/mcqs`;
// const api_path_trueFalse = `${environment.web_URL}/api/true_false`;
// const api_path_openEnded = `${environment.web_URL}/api/openEnded`;


// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionsService {

//   constructor(private http: HttpClient) { }

//   // MCQS APIs
//   addMcqs(mcqsForm: any, topicId: string): Observable<any> {
//     let id = localStorage.getItem('id')
//     return this.http.post(`${api_path_mcqs}/createQuestion/${id}/${topicId}`, mcqsForm)
//   }

//   getMcqs() {
//     return this.http.get(`${api_path_mcqs}/`)
//   }

//   // getImageMcqs(imageName: string) {
//   //   return this.http.get(`${api_path}/image?image=${imageName}`, { responseType: 'blob'})
//   // }

//   getImageMcqs(imageName: string) {
//     return this.http.get(`${api_path_mcqs}/files/${imageName}`, { responseType: 'blob' })
//   }

//   getMcqsByTopic(topic: any) {
//     let id = localStorage.getItem('id')
//     return this.http.get(`${api_path_mcqs}/getMcqs/${id}/${topic}`)
//   }

//   deleteMcqs(id: any) {
//     return this.http.delete(`${api_path_mcqs}/delete/${id}`)
//   }

//   // True false APIs
//   addTrueFalse(trueFlaseForm: any, topicId: string): Observable<any> {
//     let id = localStorage.getItem('id')
//     return this.http.post(`${api_path_trueFalse}/create/${id}/${topicId}`, trueFlaseForm)
//   }

//   getTrueFalseByTopic(topic: any) {
//     let id = localStorage.getItem('id')
//     return this.http.get(`${api_path_trueFalse}/get/${id}/${topic}`)
//   }

//   deleteTrueFalse(id: any) {
//     return this.http.delete(`${api_path_trueFalse}/delete/${id}`)
//   }

//   // Open ended question APIs
//   createOpenEnded(openEndedForm: any, topicId: string): Observable<any> {
//     let id = localStorage.getItem('id')
//     return this.http.post(`${api_path_openEnded}/create/${id}/${topicId}`, openEndedForm)
//   }

//   getOpenEndedByTopic(topic: any) {
//     let id = localStorage.getItem('id')
//     return this.http.get(`${api_path_openEnded}/get/${id}/${topic}`)
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './curd-data-service';

const api_path_mcqs = `${environment.web_URL}/api/mcqs`;
const type = 'mcqsService'
@Injectable({
  providedIn: 'root'
})
export class McqsService extends DataService {

  constructor(http: HttpClient) {
    super(http, api_path_mcqs, type)
  }
}
