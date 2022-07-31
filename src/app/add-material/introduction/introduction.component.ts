import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntroductionService } from 'src/app/service/introduction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  // public introForm: FormGroup = new FormGroup({
  //   introduction: new FormControl("", [
  //     Validators.required
  //   ]),
  //   sequence: new FormControl("", [
  //     Validators.required
  //   ])
  // })
  introduction: Array<any> = []
  topic: string
  id: any;
  isAddMode: boolean;
  submitted = false;
  introForm: any;
  questionData: any
  updatedQuestion: any
  topicId: any
  loading: boolean
  constructor(
    private introService: IntroductionService,
    private _snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('introId');
    this.isAddMode = !this.id;
    console.log(this.id)
    this.introForm = new FormGroup({
      introduction: new FormControl("", [
        Validators.required
      ]),
      sequence: new FormControl("", [
        Validators.required
      ])
    })

    if (!this.isAddMode) {
      console.log(this.id)
      this.introService.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.topicId = this.questionData.topicId
          this.introForm.patchValue({
            introduction: this.questionData.introduction,
            sequence: this.questionData.sequence,
          })
          console.log(this.questionData)
        }, err => {
          console.log(err.status + 'i am error')
        });
    }
  }

  onSubmit() {
    //   this.submitted = true;

    //   // reset alerts on submit
    //   this._snackBar.dismiss();

    //   // stop here if form is invalid
    //   if (this.openEndedForm.invalid) {
    //     return;
    //   }

      this.loading = true;
    if (this.isAddMode) {
      this.createQuestion();
    } else {
      this.updateQuestion();
    }
  }

  createQuestion() {
    this.topic = localStorage.getItem('topicId')
    console.log(this.introForm.value)


    this.introService.addAll(this.introForm.value, this.topic)
      .subscribe(
        res => {
          this.introduction = res;
          this._snackBar.open(" Your Introduction has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.loading = false
          this.SetAsSubmitted(true);
          localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
          this.introForm.reset();
        },
        err => {
          console.log(err)
          this._snackBar.open(" Your Introduction has not been Posted", "Ok", {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
        });
  }

  updateQuestion() {
    let body = this.introForm.value;
    this.introService.updateIntroduction(this.questionData._id, body).subscribe(
      res => {
        console.log("response:", res)
        this.updatedQuestion = res;

        this.introForm.patchValue({
          introduction: this.updatedQuestion.introduction,
          sequence: this.updatedQuestion.sequence

        })
        this.questionData = this.introForm.value;
        console.log(this.questionData);
        this._snackBar.open(" Your Question has been updated", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false
        this.router.navigate([`/material/view/${this.topicId}`]);
      },
      err => {
        console.log(err + 'error');
        this._snackBar.open(" Your Question has not been updated", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      });
  }

}
