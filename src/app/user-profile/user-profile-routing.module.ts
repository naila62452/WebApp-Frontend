import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { AddMaterialComponent } from './add-material/add-material.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'profile', component:ProfileComponent, canActivate: [AuthGuard]},
  { path: 'add', component:AddMaterialComponent, canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]  

})
export class UserProfileRoutingModule { }
