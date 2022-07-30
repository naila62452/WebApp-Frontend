import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AdminComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    MatSnackBarModule
  ]
})
export class AdminModuleModule { }
