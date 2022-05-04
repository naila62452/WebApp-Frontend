import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const api_path = `${environment.web_URL}/api/subject`;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }
  
  getSubject(): Observable<any> {
    return this.http.get(`${api_path}/get`)
  }
  getSubjectById(id : any): Observable<any> {
    return this.http.get(`${api_path}/getSub/${id}`)
  }

}
