import { AfterViewInit, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { TeacherAuthService } from '../service/teacher-auth.service';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Component, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map, Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public opened = true;
  private mediaWatcher: Subscription;
  @ViewChild('sidenav')
  sidenav!: MatSidenav

  constructor(private router: Router, private renderer: Renderer2,
    public translate: TranslateService,
    public teacherAuth: TeacherAuthService, private media: MediaObserver,
    private teacherService: TeacherAuthService) {
    translate.addLangs(['English', 'Español', 'Deutsch', 'Ελληνική']);
    let language = localStorage.getItem('language')
    if (language)
      this.translate.use(language)
    else translate.setDefaultLang('English');

    this.mediaWatcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
  }

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }
  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }
  switchLanguage(lang: string) {
    this.translate.use(lang)
    localStorage.setItem('language', lang)
  }
  ngOnInit(): void {
  }
	onLogout() {
		this.teacherService.onLogout()
		this.router.navigate(["/authenticate/login"]);
	}
}
