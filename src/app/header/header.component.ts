import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from '../service/teacher-auth.service';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public global: GlobalService, private router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }
  isLoggedIn() {
    var loginStatus = localStorage.getItem("isLoggedIn")
    return loginStatus == "true";
  }
}
