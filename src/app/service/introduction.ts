
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './curd-data-service';

const api_path_intro = `${environment.web_URL}/api/intro`;
const type = 'introService'
@Injectable({
  providedIn: 'root'
})
export class IntroductionService extends DataService {

  constructor(http: HttpClient) {
    super(http)
  }
}