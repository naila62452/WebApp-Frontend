import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { MCQSComponent } from './mcqs/mcqs.component';
import { OpenEndedComponent } from './open-ended/open-ended.component';
import { ScienceComponent } from './science/science.component';
import { TrueFalseComponent } from './true-false/true-false.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';

const routes: Routes = [
  { path: 'type/:id', component: ScienceComponent, canActivate: [AuthGuard]},
  { path: 'mcqs/:id', component: MCQSComponent , canActivate: [AuthGuard]},
  { path: 'true/:id', component: TrueFalseComponent , canActivate: [AuthGuard]},
  { path: 'topic/:id', component: AddTopicComponent , canActivate: [AuthGuard]},
  { path: 'openEnded/:id', component: OpenEndedComponent, canActivate: [AuthGuard]},
  { path: 'view/:id', component: ViewActivityComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]  

})
export class AddMaterialRoutingModule { }
