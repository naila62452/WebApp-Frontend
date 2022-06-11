import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntroductionService } from 'src/app/service/introduction';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public introForm: FormGroup = new FormGroup({
    introduction: new FormControl("", [
      Validators.required
    ]),
    sequence: new FormControl("", [
      Validators.required
    ])
  })
  introduction: Array<any> = []
  topic: string
  constructor(
    private introService: IntroductionService,
     private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit() {
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
          this.SetAsSubmitted(true);
          localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
          this.introForm.reset();
        },
        err => {
          console.log(err)
          this._snackBar.open(" Your Introduction has not been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        });
  }

}
