
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './curd-data-service';

const api_path_match_psirs = `${environment.web_URL}/api/match`;
@Injectable({
  providedIn: 'root'
})
export class MatchPairsService extends DataService {

  constructor(http: HttpClient) {
    super(http, api_path_match_psirs)
  }
}