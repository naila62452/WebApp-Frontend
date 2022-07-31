import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchPairsService } from 'src/app/service/match-pairs-service';
@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrls: ['./match-pairs.component.scss']
})
export class MatchPairsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  topicId: any
  id: any;
  isAddMode: boolean;
  submitted = false;
  match_pairsForm: any;
  questionData: any
  updatedQuestion: any
  loading: boolean
  constructor(private matchPairsService: MatchPairsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('matchId');
    this.isAddMode = !this.id;
    console.log(this.id)
    this.match_pairsForm = new FormGroup({
      question: new FormControl("", [
        Validators.required
      ]),
      statement1: new FormControl("", [
        Validators.required
      ]),
      answer1: new FormControl("", [
        Validators.required
      ]),
      statement2: new FormControl("", [
        Validators.required
      ]),
      answer2: new FormControl("", [
        Validators.required
      ]),
      statement3: new FormControl("", [
        Validators.required
      ]),
      answer3: new FormControl("", [
        Validators.required
      ]),
      statement4: new FormControl("", [
        Validators.required
      ]),
      answer4: new FormControl("", [
        Validators.required
      ]),
      statement5: new FormControl("", [
        Validators.required
      ]),
      answer5: new FormControl("", [
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

    if (!this.isAddMode) {
      console.log(this.id)
      this.matchPairsService.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.topicId = this.questionData.topicId
          this.match_pairsForm.patchValue({
            question: this.questionData.question,
            sequence: this.questionData.sequence,
            statement1: this.questionData.statement1,
            statement2: this.questionData.statement2,
            statement3: this.questionData.statement3,
            statement4: this.questionData.statement4,
            statement5: this.questionData.statement5,
            answer1: this.questionData.answer1,
            answer2: this.questionData.answer2,
            answer3: this.questionData.answer3,
            answer4: this.questionData.answer4,
            answer5: this.questionData.answer5,
            posFeedback: this.questionData.posFeedback,
            negFeedback: this.questionData.negFeedback
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
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.matchPairsService.addAll(this.match_pairsForm.value, this.topicId)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open(" Your Question has been created", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false
        // window.location.reload();
        this.SetAsSubmitted(true);
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
        this.match_pairsForm.reset();
      },
        err => {
          console.log(err)
          this._snackBar.open(" Your Question has not been created", "Ok", {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
        })
  }

  updateQuestion() {
    let body = this.match_pairsForm.value;
    this.matchPairsService.updateMatchPairs(this.questionData._id, body).subscribe(
      res => {
        console.log("response:", res)
        this.updatedQuestion = res;

        this.match_pairsForm.patchValue({
          statement1: this.updatedQuestion.statement1,
          statement2: this.updatedQuestion.statement2,
          statement3: this.updatedQuestion.statement3,
          statement4: this.updatedQuestion.statement4,
          statement5: this.updatedQuestion.statement5,
          answer1: this.updatedQuestion.answer1,
          answer2: this.updatedQuestion.answer2,
          answer3: this.updatedQuestion.answer3,
          answer4: this.updatedQuestion.answer4,
          answer5: this.updatedQuestion.answer5,
          question: this.updatedQuestion.question,
          sequence: this.updatedQuestion.sequence,
          posFeedback: this.updatedQuestion.posFeedback,
          negFeedback: this.updatedQuestion.negFeedback
        })
        this.questionData = this.match_pairsForm.value;
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
