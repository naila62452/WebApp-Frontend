import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TopicsService } from 'src/app/service/topics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { bounceOutLeftAnimation, slideEffect } from 'src/app/angular-animations/animations-fade';
import { transition, trigger, useAnimation } from '@angular/animations';
import { SafeData } from 'src/app/_models/save-data-interface';
@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss'],
  animations: [
    trigger('slideEffectWithBounce', [
      transition(':enter', [
        useAnimation(slideEffect)
      ]),
      transition(':leave',
        useAnimation(bounceOutLeftAnimation))
    ])
  ]
})
export class AddTopicComponent implements OnInit, SafeData {
  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar, private route: ActivatedRoute,
    private activityService: ActivityFormService,
    private router: Router) { }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeReload(e: BeforeUnloadEvent) {
    e.stopPropagation();
    if (this.topicForm.dirty) {
      return (e.returnValue = 'Are you sure you want to exit?');
    }
    return true;
  }

  isDataSaved(): boolean {
    return this.topicForm.dirty;
  }

  public topicForm: FormGroup = new FormGroup({
    topic: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
      asyncValidators: this.uniqueEmailValidator(),
      updateOn: 'blur',
    }),
    ageGroup: new FormControl("", [
      Validators.required
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
    ])
  });
  topic: Array<any> = []
  searchText = ''
  subject: any
  subId: any
  ageId: any
  selectedAge: string = '';
  topicName: any

  age: any = []
  language: any = []
  country: any = []
  grade: any = []
  type: any = []

  ngOnInit(): void {
    this.subject = this.route.snapshot.paramMap.get('id');
    this.topicService.getTopicBySubject(this.subject)
      .subscribe(res => {
        this.topic = res
        console.log('response', res)
      }, err => {
        console.log(err)
      })

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

  onSubmit() {
    console.log(this.topicForm.value)
    this.subId = this.route.snapshot.paramMap.get('id');
    this.topicService.addTopic(this.topicForm.value, this.subId, this.topicForm.value.ageGroup)
      .subscribe(
        res => {
          localStorage.setItem('topicId', res._id)
          this.snackbar.open('Your topic has been posted', 'Ok', {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.getTopicByAgeId(this.topicForm.value.ageGroup);
          this.topicForm.reset();
          localStorage.setItem('remainingQuestions', '0')
          this.router.navigate([`/material/type/${res._id}`])
        },
        err => {
          console.log(err);
          this.snackbar.open("Failed to post the Topic", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        })
  }

  // uniqueEmailValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return this.topicService.topicNameCheck(control.value).pipe(
  //       map((res) => (((res.topic)) === ((control.value)) ? { topicExists: true } : null)),
  //       catchError((err) =>{ console.log(err + 'i am error'); return null })
  //     );
  //   };
  // }

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

  getTopicByAgeId(ageId: string) {
    this.subId = this.route.snapshot.paramMap.get('id');

    this.topicService.getTopicByAgeId(this.subId, ageId)
      .subscribe(res => {

      })
  }
  // public canExit(): boolean | Observable<boolean> {
  //   return this.ngFormRef.dirty
  //     ? this.openUnsavedChangesDialog()
  //     : true;
  // };
}
