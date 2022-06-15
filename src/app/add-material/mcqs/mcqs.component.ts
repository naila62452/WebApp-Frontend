import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { McqsService } from 'src/app/service/mcqs.service';
import { TopicsService } from 'src/app/service/topics.service';
import { Output, EventEmitter } from '@angular/core';
import { mimetype } from "../../../_validator/mime-type-validator";  

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})

export class MCQSComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  // image: any
  public mcqsForm: FormGroup = new FormGroup({
    mcqs: new FormControl("", [
      Validators.required
    ]),
    option1: new FormControl("", [
      Validators.required
    ]),
    option2: new FormControl("", [
      Validators.required
    ]),
    option3: new FormControl("", [
      Validators.required
    ]),
    option4: new FormControl("", [
      Validators.required
    ]),
    answer: new FormControl("", [
      Validators.required
    ]),
    // file: new FormControl('', {
    //   validators: [Validators.required],
    //   asyncValidators: [mimetype]
    // }),
    file: new FormControl("", [
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

  constructor(private mcqsService:
    McqsService, private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer, private topicService: TopicsService) { }
  mcqs: Array<any> = []
  topicId: any
  topic: any
  topicGetById: any
  typeId: any
  mcqImages: Array<any> = []
  imageBlobUrl: Array<any> = [];
  Pickedimage: string;

  ngOnInit(): void {
    this.topic = this.route.snapshot.paramMap.get('id')
    this.topicService.getTopicByTopicId(this.topic)
      .subscribe(res => {
        this.topicGetById = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })
    // this.mcqsService.getQuestionByTopic(this.topic).subscribe(
    //   res => {
    //     console.log(res)
    //     this.imageBlobUrl = []
    //     this.mcqs = <any>res;
    //     // this.mcqs.forEach(item => {
    //     //   this.getImage(item.id)
    //     // })
    //   },
    //   err => {
    //     console.log(err)
    //   })
  }
  get file() { return this.mcqsForm.get('file'); }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
  PickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.mcqsForm.patchValue({ file: file })
    this.mcqsForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.Pickedimage = reader.result as string;
      console.log(this.Pickedimage)
    };
    reader.readAsDataURL(file);

  }

  onSubmit() {
    this.topic = this.route.snapshot.paramMap.get('id')
    const formData = new FormData();
    formData.append('file', this.mcqsForm.get('file').value);
    console.log(this.mcqsForm.get('file').value);
    formData.append("mcqs", this.mcqsForm.get('mcqs').value)
    formData.append("option1", this.mcqsForm.get('option1').value)
    formData.append("option2", this.mcqsForm.get('option2').value)
    formData.append("option3", this.mcqsForm.get('option3').value)
    formData.append("option4", this.mcqsForm.get('option4').value)
    formData.append("answer", this.mcqsForm.get('answer').value)
    formData.append("sequence", this.mcqsForm.get('sequence').value)
    formData.append("posFeedback", this.mcqsForm.get('posFeedback').value)
    formData.append("negFeedback", this.mcqsForm.get('negFeedback').value)

    this.mcqsService.addAll(formData, this.topic)
      .subscribe(
        res => {
          console.log(res + 'I am mcqs')
          this._snackBar.open(" Your Question has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.SetAsSubmitted(true);
          localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
          this.mcqsForm.reset();
        },
        err => {
          console.log('I am error' + err)
          this._snackBar.open('You question has not posted', 'Ok', {
            duration: 5000,
            panelClass: ['blue-snackbar']
          })
        });
  }

  // Get image api
  // getImage(id: string) {
  //   console.log(this.mcqsForm.get('file').value.name)
  //   this.questionService.getImageMcqs(id)
  //     .subscribe((blob: any) => {
  //       let objectURL = URL.createObjectURL(blob);
  //       this.imageBlobUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
  //       console.log(this.imageBlobUrl)
  //     })
  // }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.imageBlobUrl = reader.result;
  //     this.imageBlobUrl = this.getSantizeUrl(this.imageBlobUrl)
  //     console.log(this.imageBlobUrl)
  //   }, false);

  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }
  processFile(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.mcqsForm.get('file').setValue(file);
    }
  }
}



 // onSubmit() {
  //   this.typeId = this.route.snapshot.paramMap.get('id')
  //   this.topic = localStorage.getItem('topicId')
  //   console.log(this.mcqsForm.value)
  //   this.mcqsService.addAll(this.mcqsForm.value, this.topic)
  //     .subscribe(
  //       res => {
  //         this.mcqs.push(res);
  //         this._snackBar.open(" Your Question has been Posted", "Ok", {
  //           duration: 5000,
  //           panelClass: ['blue-snackbar']
  //         });
  //         this.SetAsSubmitted(true);
  //         localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
  //         this.mcqsForm.reset();
  //       },
  //       err => {
  //         console.log(err)
  //       });
  // }