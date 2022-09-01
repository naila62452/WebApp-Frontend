import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { McqsService } from 'src/app/service/mcqs.service';
import { OpenEndedService } from 'src/app/service/open-ended-service';
import { TopicsService } from 'src/app/service/topics.service';
import { TrueFalseService } from 'src/app/service/true-false-service';
import { IntroductionService } from 'src/app/service/introduction';
import { MatchPairsService } from 'src/app/service/match-pairs-service';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';

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
  userId = localStorage.getItem('id');
  totalNumberOfQuestions: any
  typeNameArray: any

  constructor(private mcqsService: McqsService,
    private openEndedService: OpenEndedService, private matchPairsService: MatchPairsService,
    private trueFalseService: TrueFalseService, private introService: IntroductionService,
    private route: ActivatedRoute, private topicService: TopicsService, private router: Router,
    private dialogueService: ConfirmDialogService,
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
          // let i;
          // for( i = 1; i <= this.topicGetById[0].combineQuestion.length; i++) {
          //   this.topicGetById[0].combineQuestion[i-1].sequence = i
          // }
          console.log('response', this.topicGetById[0])
          this.totalNumberOfQuestions = this.topicGetById[0]?.noOfQuestions - parseInt(localStorage.getItem('remainingQuestions'))
          console.log(this.totalNumberOfQuestions, "total number")
        }, err => {
          console.log(err)
        })
  }

  // openDeleteDialogue(id: any): void {
  //   const options = {
  //     title: 'Delete Question?',
  //     message: 'Are you sure you want to delete this Question?',
  //     cancelCaption: 'No',
  //     confirmCaption: 'Yes'
  //   };
  //   this.dialogueService.open(options)
  //   this.dialogueService.confirmed().subscribe(confirm => {
  //     if (confirm) {
  //       let arr = this.topicGetById[0].combineQuestion
  //       const newArray = arr.map((element: { questionType: any; }) => element.questionType);
  //       console.log(newArray);
  //       newArray.forEach((element: any) => {
  //         this.typeNameArray = element
  //         console.log(this.typeNameArray, " i am type")
  //       });
  //       if (this.typeNameArray === 'openEnded') {
  //         this.onDeleteOpenEnded(id);
  //         console.log('i am deleted ' + this.typeNameArray)
  //       }
  //       if (this.typeNameArray === 'introduction') {
  //         console.log('i am deleted ' + this.typeNameArray)
  //         this.onDeleteIntro(id);
  //       }
  //       if (this.typeNameArray === 'mcqs') {
  //         console.log('i am deleted ' + this.typeNameArray)
  //         this.onDeleteMcqs(id);
  //       }
  //       if (this.typeNameArray === 'matchPairs') {
  //         console.log('i am deleted ' + this.typeNameArray)
  //         this.onDeleteMatchPairs(id);
  //       }
  //       if (this.typeNameArray === 'trueFalse') {
  //         console.log('i am deleted ' + this.typeNameArray)
  //         this.onDeleteTrueFalse(id);
  //       }
  //     }
  //     else return
  //   })
  // }

  openDeleteDialogueMcqs(id: any): void {
    const options = {
      title: 'Delete Question?',
      message: 'Are you sure you want to delete this Question?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
       this.onDeleteMcqs(id)
      }
      else return
    })
  }

  openDeleteDialogueIntro(id: any): void {
    const options = {
      title: 'Delete Question?',
      message: 'Are you sure you want to delete this Question?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
       this.onDeleteIntro(id)
      }
      else return
    })
  }
  openDeleteDialogueOpen(id: any): void {
    const options = {
      title: 'Delete Question?',
      message: 'Are you sure you want to delete this Question?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
       this.onDeleteOpenEnded(id)
      }
      else return
    })
  }

  openDeleteDialogueTrueFalse(id: any): void {
    const options = {
      title: 'Delete Question?',
      message: 'Are you sure you want to delete this Question?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
       this.onDeleteTrueFalse(id)
      }
      else return
    })
  }

  openDeleteDialogueMatch(id: any): void {
    const options = {
      title: 'Delete Question?',
      message: 'Are you sure you want to delete this Question?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
       this.onDeleteMatchPairs(id)
      }
      else return
    })
  }

  onDeleteMcqs(id: any) {
    this.mcqsService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) - 1 + '')
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        window.location.reload()
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }

  onDeleteTrueFalse(id: any) {
    this.trueFalseService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) - 1 + '')
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        window.location.reload()
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }

  onDeleteOpenEnded(id: any) {
    this.openEndedService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) - 1 + '')
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        window.location.reload()
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }

  onDeleteIntro(id: any) {
    this.introService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) - 1 + '')
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        window.location.reload()
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }

  onDeleteMatchPairs(id: any) {
    this.matchPairsService.delete(id).subscribe(
      res => {
        this.ngOnInit();
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) - 1 + '')
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        window.location.reload()
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Question has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }

  deleteTopic(id: any) {
    this.topicService.deleteTopic(id).subscribe(
      res => {
        this._snackBar.open(" Your Topic has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/user/view']);
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Topic has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }
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
}
