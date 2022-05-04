import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/service/questions.service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {
  topic: any;
  topicGetById: any;
  mcqs: Array<any> = []
  trueFalse: Array<any> = []

  constructor(private questionService: QuestionsService,
    private route: ActivatedRoute, private topicService: TopicsService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.topic = this.route.snapshot.paramMap.get('id')
    this.topicService.getTopicByTopicId(this.topic)
      .subscribe(res => {
        this.topicGetById = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
    this.questionService.getMcqsByTopic(this.topic).subscribe(
      res => {
        console.log(res)
        // this.imageBlobUrl = []
        this.mcqs = <any>res;
        // this.mcqs.forEach(item => {
        //   this.getImage(item.id)
        // })
      },
      err => {
        console.log(err)
      })
      this.questionService.getTrueFalseByTopic(this.topic)
      .subscribe(res => {
        this.trueFalse = <any>res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
  }
  onDelete(id: any) {
    this.questionService.deleteMcqs(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
}
