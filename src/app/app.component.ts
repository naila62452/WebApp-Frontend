import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Seeds';

  constructor(public translate: TranslateService) {
    translate.addLangs(['English', 'Español', 'Deutsch', 'Ελληνική']);
    translate.setDefaultLang('English');
  }
  switchLanguage(lang: string) {
    let language = (this.translate.use(lang))
    localStorage.setItem('language', JSON.stringify(language))
  }
  currentLang() {
    localStorage.getItem('language')
  }
}
