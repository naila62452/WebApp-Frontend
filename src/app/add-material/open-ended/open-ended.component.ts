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
  question: Array<any> = []
  topic: string
  Pickedimage: string;
  openEndedQuestion: any
  loading: boolean
  id: any;
  isAddMode: boolean;
  submitted = false;
  openEndedForm: any;
  questionData: any
  updatedQuestion: any
  topicId: any
  imageUrl: any
  url: any
  deleteImage: any

  constructor(
    private openEnded: OpenEndedService,
    private router: Router, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private topicService: TopicsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('questionId');
    this.isAddMode = !this.id;
    console.log(this.id)
    this.openEndedForm = new FormGroup({
      question: new FormControl("", [
        Validators.required
      ]),
      sequence: new FormControl("", [
        Validators.required
      ]),
      file: new FormControl("", [
      ]),
    })

    if (!this.isAddMode) {
      console.log(this.id)
      this.openEnded.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.imageUrl = this.questionData.file
          this.topicId = this.questionData.topicId
          this.openEndedForm.patchValue({
            question: this.questionData.question,
            sequence: this.questionData.sequence,
            file: this.questionData.file
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
    // this.topic = localStorage.getItem('topicId')
    this.topicId = this.route.snapshot.paramMap.get('id')

    const formData = new FormData();
    if (this.openEndedForm.get('file').value) {
      formData.append('file', this.openEndedForm.get('file').value);
    }

    formData.append("question", this.openEndedForm.get('question').value)
    formData.append("sequence", this.openEndedForm.get('sequence').value)
    console.log(this.openEndedForm.value)
    this.openEnded.addAll(formData, this.topicId)
      .subscribe(
        res => {
          this.openEndedQuestion = res
          this.question.push(res);
          this._snackBar.open(" Your Question has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.loading = false;
          this.SetAsSubmitted(true);
          localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
          this.openEndedForm.reset();
        },
        err => {
          console.log(err)
        });
  }
  updateQuestion() {
    const formData = new FormData();
    if (this.openEndedForm.get('file').value) {
      formData.append('file', this.openEndedForm.get('file').value);
    }
    formData.append("question", this.openEndedForm.get('question').value)
    formData.append("sequence", this.openEndedForm.get('sequence').value)
    console.log(formData.get('file'))
    this.openEnded.updateOpenEnded(formData, this.questionData._id).subscribe(
      res => {
        this.updatedQuestion = res;
        this.openEndedForm.patchValue({
          question: this.updatedQuestion.question,
          sequence: this.updatedQuestion.sequence,
          file: this.updatedQuestion.file
        })
        this.questionData = this.openEndedForm.value;
        console.log(this.questionData);
        this._snackBar.open(" Your Question has been updated", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false;
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

  DeleteImage() {
    this.Pickedimage = ''
  }

  DeleteImageBackend() {
    this.imageUrl = ''
    this.openEndedForm.patchValue({
      file: ''
    })
    // this.url = this.questionData.file.split('?')[0].split('/').pop()

    // this.openEnded.deleteImage(this.url).subscribe(
    //   res => {
    //     console.log('Image deleted' + res)
    //   },
    //   err => {
    //     console.log(err + 'Image error')
    //   })

    // let body = this.openEndedForm.value
    // this.openEnded.updateOpenEndedImage(this.questionData._id, body).subscribe(
    //   res => {
    //     this.deleteImage = res;
    //     this.openEndedForm.patchValue({
    //       question: this.deleteImage.question,
    //       sequence: this.deleteImage.sequence,
    //       file: ''
    //     })
    //     this.questionData = this.openEndedForm.value;
    //     console.log(this.questionData);
    //     this._snackBar.open(" Your Image has been deleted", "Ok", {
    //       duration: 5000,
    //       panelClass: ['blue-snackbar']
    //     });
    //   },
    //   err => {
    //     console.log(err + 'error');
    //     this._snackBar.open(" Your Image has not been deleted", "Ok", {
    //       duration: 5000,
    //       panelClass: ['red-snackbar']
    //     });
    //   })
  }
}
