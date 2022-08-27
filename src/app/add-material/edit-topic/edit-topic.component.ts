import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {

  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar, private route: ActivatedRoute,
    private activityService: ActivityFormService,
    private router: Router) {
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    this.topicService.getTopicByTopicId(this.topicId).subscribe(
      res => {
        this.updateTopic = res;
        this.topicForm.patchValue({
          topic: this.updateTopic.topic,
          ageGroup: this.updateTopic.ageGroup,
          language: this.updateTopic.language,
          country: this.updateTopic.country,
          grade: this.updateTopic.grade,
          noOfQuestions: this.updateTopic.noOfQuestions,
          time: this.updateTopic.time,
          subject: this.updateTopic.subject,
          access: this.updateTopic.access,
          accessCode: this.updateTopic.accessCode
        })
        console.log(this.updateTopic)
      });
  }
  get access() { return this.topicForm.get('access'); }
  get accessCode() { return this.topicForm.get('accessCode'); }

  public topicForm: FormGroup = new FormGroup({
    topic: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
      // asyncValidators: this.uniqueEmailValidator(),
      // updateOn: 'blur',
    }),
    ageGroup: new FormControl("", [
      Validators.required
    ]),
    subject: new FormControl("", [

    ]),
    language: new FormControl("", [
      Validators.required
    ]),
    country: new FormControl("", [
      Validators.required
    ]),
    grade: new FormControl("", [
      Validators.required
    ]),
    noOfQuestions: new FormControl("", [
      Validators.required
    ]),
    time: new FormControl("", [
      Validators.required
    ]),
    access: new FormControl("", [
    ]),
    accessCode: new FormControl("", [
    ])
  });

  topic: Array<any> = []
  subject: any
  searchText = ''
  subjectId: any
  subId: any
  ageId: any
  selectedAge: string = '';
  topicName: any
  loading: boolean
  age: any = []
  language: any = []
  country: any = []
  grade: any = []
  type: any = []
  topicId: any
  updateTopic: any
  updatedTopic: any
  ngOnInit(): void {
    this.activityService.getGeGroup()
      .subscribe(data => {
        this.age = data
        console.log(data)
      })

    this.activityService.getAllLanguage()
      .subscribe(langData => {
        this.language = langData;
        console.log(langData)
      })

    this.activityService.getCountry()
      .subscribe(countryData => {
        this.country = countryData;
        console.log(countryData)
      })

    this.activityService.getGrade()
      .subscribe(gradeData => {
        this.grade = gradeData;
        console.log(gradeData)
      })

    this.activityService.getQuestionType()
      .subscribe(typeData => {
        this.type = typeData;
        console.log(typeData)
      })
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.topicService.topicNameCheck(control.value).pipe(
        map((res) => {
          let resTopic: string = res.topic;
          let inputTopic: string = control.value;

          return (resTopic?.toLowerCase() === inputTopic?.toLowerCase() ? { topicExists: true } : null)
        }),
        catchError((err) => { console.log(err + 'i am error'); return null })
      )
    }
  }

  onUpdate() {
    let body = this.topicForm.value;
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    this.topicService.updateTopic(body, this.topicId).subscribe(
      res => {
        this.updatedTopic = res;
        this.topicForm.patchValue({
          topic: this.updatedTopic.topic,
          ageGroup: this.updatedTopic.ageGroup,
          language: this.updatedTopic.language,
          country: this.updatedTopic.country,
          grade: this.updatedTopic.grade,
          noOfQuestions: this.updatedTopic.noOfQuestions,
          time: this.updatedTopic.time,
          access: this.updatedTopic.access,
          accessCode: this.updatedTopic.accessCode
        })
        this.updateTopic = this.topicForm.value;
        console.log("updated", this.updateTopic);
        this.snackbar.open(" You topic has been updated", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate([`/material/view/${this.topicId}`]);
      },
      (err: any) => {
        this.snackbar.open("That topic name already exists.", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        this.router.navigate([`/material/edit-topic/${this.topicId}`]);
      });
  }
  isAccessChange(event: any) {
    console.log(event.checked)
    if(event.checked) {
      this.topicForm.controls['accessCode'].setValidators([Validators.required])
      this.topicForm.controls['accessCode'].updateValueAndValidity()
    }
    else {
      this.topicForm.controls['accessCode'].clearValidators()
      this.topicForm.controls['accessCode'].updateValueAndValidity()
    }
  }
}

