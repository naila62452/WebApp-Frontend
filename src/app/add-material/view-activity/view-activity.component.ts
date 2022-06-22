import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { McqsService } from 'src/app/service/mcqs.service';
import { OpenEndedService } from 'src/app/service/open-ended-service';
import { TopicsService } from 'src/app/service/topics.service';
import { TrueFalseService } from 'src/app/service/true-false-service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({
        opacity: 0,
        backgroundColor: '#ccdceb'
      })),
      transition('void => *', [
        animate(2000)
      ]),
      transition('* => void', [
        animate(2000)
      ])
    ])
  ]
})
export class ViewActivityComponent implements OnInit {
  topic: any;
  topicGetById: Array<any> = []
  processSort: any
  // mcqsArray: Array<any> = []
  // trueFalse: Array<any> = []
  // openEnded: Array<any> = []

  constructor(private mcqsService: McqsService,
    private openEndedService: OpenEndedService,
    private trueFalseService: TrueFalseService,
    private route: ActivatedRoute, private topicService: TopicsService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.topic = this.route.snapshot.paramMap.get('id')
    this.topicService.getAllTopicData(this.topic)
      .subscribe(
        response => {
          this.topicGetById = <any>response
          this.topicGetById[0]["combineQuestion"] = this.topicGetById[0].topics_mcqs_info.
            concat(this.topicGetById[0].topics_trueFalse_info).concat(this.topicGetById[0].topics_openEnded_info)
            .concat(this.topicGetById[0].topics_intro_info)
            .sort((low: { sequence: number; }, high: { sequence: number; }) => {
              return low.sequence - high.sequence;
            })
          console.log('response', this.topicGetById[0])
        }, err => {
          console.log(err)
        })

    // this.mcqsService.getQuestionByTopic(this.topic).subscribe(
    //   res => {
    //     console.log('mcqs', res)
    //     // this.imageBlobUrl = []
    //     this.mcqsArray = <any>res;
    //     // this.mcqs.forEach(item => {
    //     //   this.getImage(item.id)
    //     // })
    //   },
    //   err => {
    //     console.log(err)
    //   })
    //   this.trueFalseService.getQuestionByTopic(this.topic)
    //   .subscribe(res => {
    //     this.trueFalse = <any>res
    //     console.log('true false', res)
    //   }, err => {
    //     console.log(err)
    //   })
    //   this.openEndedService.getQuestionByTopic(this.topic)
    //   .subscribe(res => {
    //     this.openEnded = <any>res
    //     console.log('openended', res)
    //   }, err => {
    //     console.log(err)
    //   })
  }
  onDeleteMcqs(id: any) {
    this.mcqsService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }

  onDeleteTrueFalse(id: any) {
    this.trueFalseService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }

  onDeleteOpenEnded(id: any) {
    this.openEndedService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
  onDeleteIntro(id: any) {
    this.openEndedService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
}
