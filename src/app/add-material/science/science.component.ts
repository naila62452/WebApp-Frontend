import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { TopicsService } from 'src/app/service/topics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fade, slidingEntrance } from 'src/app/angular-animations/animations-fade';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
  animations: [
    fade
  ]
})

export class ScienceComponent implements OnInit {
  selectedValue: string[] = [];
  ifSubmitted: boolean[] = [];
  totalNumberOfQuestions = 0
  topicGetById: any = {};
  arr: any[] = []
  constructor(private category: ActivityFormService,
    private route: ActivatedRoute, private topicService: TopicsService,
    private _snackBar: MatSnackBar, private router: Router) { }
  type: any = []
  topicId: any
  ngOnInit(): void {

    this.topicId = this.route.snapshot.paramMap.get('id');
    this.topicService.getTopicByTopicId(this.topicId)
      .subscribe(res => {
        this.topicGetById = res
        console.log(res.noOfQuestions)
        console.log('response', res)
        this.totalNumberOfQuestions = res.noOfQuestions - parseInt(localStorage.getItem('remainingQuestions'))
        this.arr = Array(Number(this.totalNumberOfQuestions)).fill(0)
        this.selectedValue = Array(Number(this.totalNumberOfQuestions)).fill('')
        this.ifSubmitted = Array(Number(this.totalNumberOfQuestions)).fill(false)
        console.log(this.arr)
        if (this.totalNumberOfQuestions === 0) {
          // window.location.reload();

          this._snackBar.open("All Questions has been submitted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          })
          //  window.location.reload();

          this.router.navigate([`/material/view/${res._id}`]);
        }

      }, err => {
        console.log(err)
      })
    localStorage.setItem('topicId', this.topicId);
    console.log(localStorage.getItem('topicId'))
    this.category.getQuestionType()
      .subscribe(typeData => {
        this.type = typeData
        console.log(typeData)
      })
  }
  setSubmit(value: boolean, index: number) {
    this.ifSubmitted[index] = true
    localStorage.setItem('submit', JSON.stringify(this.ifSubmitted[index]))
    let result = JSON.parse(localStorage.getItem('submit'))

  }
}

