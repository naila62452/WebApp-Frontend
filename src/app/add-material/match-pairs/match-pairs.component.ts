import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
  public match_pairsForm: FormGroup = new FormGroup({
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

  constructor(private match_pairs: MatchPairsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.topicId = this.route.snapshot.paramMap.get('id')
    this.match_pairs.addAll(this.match_pairsForm.value, this.topicId)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open(" Your Question has been created", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        // window.location.reload();
        this.SetAsSubmitted(true);
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
        this.match_pairsForm.reset();
      },
        err => {
          console.log(err)
          this._snackBar.open(" Your Question has not been created", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        })
  }
}
