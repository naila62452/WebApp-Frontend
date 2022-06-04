import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from 'src/app/service/topics.service';
import { Output, EventEmitter } from '@angular/core';
import { TrueFalseService } from 'src/app/service/true-false-service';

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss']
})
export class TrueFalseComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  public trueFalseForm: FormGroup = new FormGroup({
    question: new FormControl("", [
      Validators.required
    ]),
    answer: new FormControl("", [
      Validators.required
    ]),
    posFeedback: new FormControl("", [
      Validators.required
    ]),
    negFeedback: new FormControl("", [
      Validators.required
    ]),
    sequence: new FormControl("", [
      Validators.required
    ])
  })

  constructor(
    private trueFalseService: TrueFalseService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private topicService: TopicsService ) { }
  trueFalse: Array<any> = []
  topicId: any
  topicGetById: any
  ngOnInit(): void {
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.topicService.getTopicByTopicId(this.topicId)
      .subscribe(res => {
        this.topicGetById = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
  }
  onSubmit() {
    if (this.trueFalse.length >= this.topicGetById.noOfQuestions) {
      this._snackBar.open(" Your Limit has been execced", "Ok", {
        duration: 5000,
        panelClass: ['blue-snackbar']
      });
      return
    }
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.trueFalseService.addAll(this.trueFalseForm.value, this.topicId)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open(" Your Question has been created", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        // window.location.reload();
        this.SetAsSubmitted(true);
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
        this.trueFalseForm.reset();
      },
        err => {
          console.log(err)
        });
  }
}
