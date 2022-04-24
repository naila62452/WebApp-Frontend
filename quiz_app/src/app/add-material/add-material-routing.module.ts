import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { MCQSComponent } from './mcqs/mcqs.component';
import { ScienceComponent } from './science/science.component';
import { TrueFalseComponent } from './true-false/true-false.component';

const routes: Routes = [
  { path: 'subject/:id', component: ScienceComponent},
  { path: 'mcqs/:id', component: MCQSComponent },
  // { path: 'topic/:subject', component: AddTopicComponent },
  { path: 'topic/:id', component: AddTopicComponent, children: [
    {
      path: ':id', component: MCQSComponent,
    },
    {
      path: ':id', component: TrueFalseComponent,
    },
    
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMaterialRoutingModule { }
