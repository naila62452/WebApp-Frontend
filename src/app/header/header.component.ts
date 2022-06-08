import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from '../service/teacher-auth.service';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authListenerSubs: Subscription;
  public userIsAuthenticated = false;
  
  // id = localStorage.getItem('id')
  constructor(private router: Router,
    public translate: TranslateService,
    public teacherAuth: TeacherAuthService) {
    translate.addLangs(['English', 'Español', 'Deutsch', 'Ελληνική']);
    let language = localStorage.getItem('language')
    if (language)
      this.translate.use(language)
    else translate.setDefaultLang('English');
  }
  switchLanguage(lang: string) {
    this.translate.use(lang)
    localStorage.setItem('language', lang)
  }
  ngOnInit(): void {
  }
}
