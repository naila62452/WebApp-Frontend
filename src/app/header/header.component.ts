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
  username = localStorage.getItem('name')
  authListenerSubs: Subscription;  
  public userIsAuthenticated = false;  

  constructor(private router: Router,
    public translate: TranslateService,
   public teacherAuth: TeacherAuthService)
    {
    translate.addLangs(['English', 'Español']);
    translate.setDefaultLang('English');
  }
  switchLanguage(lang: string) {
    this.translate.use(lang)
  }
  ngOnInit(): void {
  }
  ngOnDestroy(){  
    this.authListenerSubs.unsubscribe();  
  }    
  // isLoggedIn() {
  //   var loginStatus = localStorage.getItem("isLoggedIn")
  //   return loginStatus == "true";

  //   // let jwtHelper = new JwtHelperService();
  //   // let token = localStorage.getItem('token');
  //   // if(!token)
  //   // return false
  //   // let expireTime = jwtHelper.getTokenExpirationDate(token)
  //   // let isExpired = jwtHelper.isTokenExpired(token)
  //   // console.log('date', expireTime)
  //   // console.log('isExpired', isExpired)
  //   // return isExpired
    
  // }

}
