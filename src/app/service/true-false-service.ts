import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './curd-data-service';

const api_path_trueFalse = `${environment.web_URL}/api/true_false`;

@Injectable({
  providedIn: 'root'
})
export class TrueFalseService extends DataService {
  constructor(http: HttpClient) {
    super (http, api_path_trueFalse)
   }
}