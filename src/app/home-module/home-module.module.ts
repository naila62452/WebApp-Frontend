import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModuleRoutingModule } from './home-module-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../angular_material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HomeModuleRoutingModule,
    TranslateModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModuleModule { }
