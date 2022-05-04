import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss']
})

export class ScienceComponent implements OnInit {
  selectedValue: string[] = [];
  ifSubmitted: boolean[] = [];

  topicGetById: any = {};
  arr: any[] = []
  constructor(private category: ActivityFormService,
    private route: ActivatedRoute, private topicService: TopicsService) { }
  type: any = []
  topicId: any
  ngOnInit(): void {

    this.topicId = this.route.snapshot.paramMap.get('id');
    this.topicService.getTopicByTopicId(this.topicId)
      .subscribe(res => {
        this.topicGetById = res
        console.log(res.noOfQuestions)
        console.log('response', res)
        this.arr = Array(Number(this.topicGetById.noOfQuestions)).fill(0)
        this.selectedValue = Array(Number(this.topicGetById.noOfQuestions)).fill('')
        this.ifSubmitted = Array(Number(this.topicGetById.noOfQuestions)).fill(false)
        console.log(this.arr)
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

