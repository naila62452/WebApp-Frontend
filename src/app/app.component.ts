import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Seeds';

  constructor(public translate: TranslateService, private observer: BreakpointObserver, private router: Router) {
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
}
