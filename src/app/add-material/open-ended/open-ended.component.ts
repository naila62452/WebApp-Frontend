import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenEndedService } from 'src/app/service/open-ended-service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-open-ended',
  templateUrl: './open-ended.component.html',
  styleUrls: ['./open-ended.component.scss']
})
export class OpenEndedComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  public openEndedForm: FormGroup = new FormGroup({
    question: new FormControl("", [
      Validators.required
    ]),
    sequence: new FormControl("", [
      Validators.required
    ]),
    file: new FormControl("", [
    ]),
  })
  question: Array<any> = []
  topic: string
  Pickedimage: string;

  constructor(
    private openEnded: OpenEndedService,
    private router: Router, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private topicService: TopicsService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.topic = localStorage.getItem('topicId')
    const formData = new FormData();
    formData.append('file', this.openEndedForm.get('file').value);
    formData.append("question", this.openEndedForm.get('question').value)
    formData.append("sequence", this.openEndedForm.get('sequence').value)
    console.log(this.openEndedForm.value)
    this.openEnded.addAll(formData, this.topic)
      .subscribe(
        res => {
          this.question.push(res);
          this._snackBar.open(" Your Question has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.SetAsSubmitted(true);
          localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
          this.openEndedForm.reset();
        },
        err => {
          console.log(err)
        });
  }

  PickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.openEndedForm.patchValue({ file: file })
    this.openEndedForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.Pickedimage = reader.result as string;
      console.log(this.Pickedimage)
    };
    reader.readAsDataURL(file);

  }
}
