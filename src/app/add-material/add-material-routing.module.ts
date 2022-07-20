import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { CanDeactivateGuard } from 'src/_validator/_auth/deactive-guard';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MatchPairsComponent } from './match-pairs/match-pairs.component';
import { MCQSComponent } from './mcqs/mcqs.component';
import { OpenEndedComponent } from './open-ended/open-ended.component';
import { ScienceComponent } from './science/science.component';
import { TrueFalseComponent } from './true-false/true-false.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';

const routes: Routes = [
  { path: 'type/:id', component: ScienceComponent, canActivate: [AuthGuard] },
  { path: 'mcqs/:mcqsId', component: MCQSComponent, canActivate: [AuthGuard] },
  { path: 'true/:trueFalseId', component: TrueFalseComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id', component: AddTopicComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'openEnded/:questionId', component: OpenEndedComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewActivityComponent, canActivate: [AuthGuard] },
  { path: 'match/:matchId', component: MatchPairsComponent, canActivate: [AuthGuard] },
  { path: 'introduction/:introId', component: IntroductionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, CanDeactivateGuard]

})
export class AddMaterialRoutingModule { }
