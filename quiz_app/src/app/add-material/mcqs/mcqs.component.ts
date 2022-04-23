import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/service/questions.service';

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})
export class MCQSComponent implements OnInit {

  image: any
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
    file: new FormControl("", [
    ])
  })

  constructor(private questionService:
    QuestionsService, private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }
  mcqs: Array<any> = []
  topicId: any
  topic: any
  typeId: any
  mcqImages: Array<any> = []
  imageBlobUrl: any;

  // mcqImages: any

  ngOnInit(): void {
    this.typeId = this.route.snapshot.paramMap.get('id')
    localStorage.setItem('typeId', this.typeId)

    this.topic = localStorage.getItem('topicId')
    // debugger
    this.questionService.getMcqsByTopic(this.topic, this.typeId).subscribe(
      res => {
        console.log(res)
        this.mcqs = <any>res;
      },
      err => {
        console.log(err)
      })
  }
  // onSubmit() {
  //   this.typeId = this.route.snapshot.paramMap.get('id')
  //   this.topic = localStorage.getItem('topicId')
  //   console.log(this.mcqsForm.value)

  //   const formData = new FormData();
  //   formData.append('file', this.mcqsForm.get('file').value);
  //   this.questionService.addMcqs(this.mcqsForm.value, formData, this.topic, this.typeId)
  //     .subscribe(
  //       res => {
  //         this.mcqs.push(res);
  //         this._snackBar.open(" Your Question has been Posted", "Ok", {
  //           duration: 5000,
  //           panelClass: ['blue-snackbar']
  //         });
  //         this.mcqsForm.reset();
  //       },
  //       err => {
  //         console.log(err)
  //       });
  // }
  onSubmit() {
    this.typeId = this.route.snapshot.paramMap.get('id')
    this.topic = localStorage.getItem('topicId')


    this.mcqsForm.get('file')


    // this.questionService.addMcqs(this.mcqsForm.value, this.topic, this.typeId)  
    const formData = new FormData();
    formData.append('file', this.mcqsForm.get('file').value);
    // console.log(this.mcqsForm.get('file').value);
    formData.append("mcqs", this.mcqsForm.get('mcqs').value)
    formData.append("option1", this.mcqsForm.get('option1').value)
    formData.append("option2", this.mcqsForm.get('option2').value)
    formData.append("option3", this.mcqsForm.get('option3').value)
    formData.append("option4", this.mcqsForm.get('option4').value)
    formData.append("answer", this.mcqsForm.get('answer').value)

    this.questionService.addMcqs(formData, this.topic, this.typeId)
      .subscribe(
        res => {
          this.mcqs.push(res);
          this.getImage()
          this._snackBar.open(" Your Question has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.mcqsForm.reset();
        },
        err => {
          console.log(err)
        });
  }
  getImage() {
    console.log(this.mcqsForm.get('file').value.name)
    this.questionService.getImageMcqs(this.mcqsForm.get('file').value.name)
      .subscribe(res => {
        // this.mcqImages = <any>res
        // console.log(this.mcqImages)
        this.createImageFromBlob(res)
      })
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  onDelete(id: any) {
    this.questionService.deleteMcqs(id).subscribe(
      res => {
        this.ngOnInit();
        this._snackBar.open(" Your Question has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
  processFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.mcqsForm.get('file').setValue(file);
    }
  }
}
