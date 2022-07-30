import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './curd-data-service';

const api_path_openEnded = `${environment.web_URL}/api/openEnded`;
const type = 'openEndedService'
@Injectable({
  providedIn: 'root'
})

export class OpenEndedService extends DataService {
  constructor(http: HttpClient) {
    super (http, api_path_openEnded, type)
   }
}