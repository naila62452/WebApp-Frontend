import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { McqsService } from 'src/app/service/mcqs.service';
import { OpenEndedService } from 'src/app/service/open-ended-service';
import { TopicsService } from 'src/app/service/topics.service';
import { TrueFalseService } from 'src/app/service/true-false-service';
import { MatDialog } from '@angular/material/dialog';
import { OpenEndedComponent } from '../open-ended/open-ended.component';

enum ServiceEnum {
  mcqsService = 'mcqsService',
  trueFalseService = 'trueFalseService',
  openEndedService = 'openEndedService',
  introductionService = 'intro',
  matchPairsService = 'matchPairsService'
}

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

  constructor(private mcqsService: McqsService,
    private openEndedService: OpenEndedService,
    private trueFalseService: TrueFalseService,
    private route: ActivatedRoute, private topicService: TopicsService,
    private dialogue: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.topic = this.route.snapshot.paramMap.get('id')
    this.topicService.getAllTopicData(this.topic)
      .subscribe(
        response => {
          this.topicGetById = <any>response
          this.topicGetById[0]["combineQuestion"] = this.topicGetById[0].allQuestions
            .sort((low: { sequence: number; }, high: { sequence: number; }) => {
              return low.sequence - high.sequence;
            })
          console.log('response', this.topicGetById[0])
        }, err => {
          console.log(err)
        })
  }

  openDialogue() {
		this.dialogue.open(OpenEndedComponent)
	}
  // onDeleteMcqs(id: any) {
  //   this.mcqsService.delete(id).subscribe(
  //     res => {
  //       this.ngOnInit();
  //       this._snackBar.open(" Your Question has been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }, err => {
  //       console.log(err)
  //       this._snackBar.open(" Your Question has not been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }
  //   )
  // }

  // onDeleteTrueFalse(id: any) {
  //   this.trueFalseService.delete(id).subscribe(
  //     res => {
  //       this.ngOnInit();
  //       this._snackBar.open(" Your Question has been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }, err => {
  //       console.log(err)
  //       this._snackBar.open(" Your Question has not been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }
  //   )
  // }

  getServiceName(service: ServiceEnum) {
    switch (service) {
      case ServiceEnum.mcqsService:
        break;
      // console.log(service + ' enum service')
      // return 'mcqsService';
      case ServiceEnum.trueFalseService:
        break;
      // return 'trueFalseService';
      case ServiceEnum.introductionService:
        console.log(ServiceEnum.introductionService)
        break;
      // return 'introService';
      case ServiceEnum.matchPairsService:
        break;
      // return 'matchPairsService';
      case ServiceEnum.openEndedService:
        break;
      // return 'openEndedService';
      default:
        throw new Error(`Non-existent service in switch: ${service}`);
    }
  }

  deleteQuestions(id: any, type: ServiceEnum) {
    this.openEndedService.delete(id, type).subscribe(
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

  // onDeleteOpenEnded(id: any) {
  //   this.openEndedService.delete(id).subscribe(
  //     res => {
  //       this.ngOnInit();
  //       this._snackBar.open(" Your Question has been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }, err => {
  //       console.log(err)
  //       this._snackBar.open(" Your Question has not been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }
  //   )
  // }
  // onDeleteIntro(id: any) {
  //   this.openEndedService.delete(id).subscribe(
  //     res => {
  //       this.ngOnInit();
  //       this._snackBar.open(" Your Question has been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }, err => {
  //       console.log(err)
  //       this._snackBar.open(" Your Question has not been Deleted", "Ok", {
  //         duration: 5000,
  //         panelClass: ['blue-snackbar']
  //       });
  //     }
  //   )
  // }
}
