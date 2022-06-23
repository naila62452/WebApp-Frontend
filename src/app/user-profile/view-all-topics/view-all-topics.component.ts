import { animate, query, stagger, style, transition, trigger, group, animateChild } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-view-all-topics',
  templateUrl: './view-all-topics.component.html',
  styleUrls: ['./view-all-topics.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('250ms', [
            animate('500ms', style({ opacity: 1, transform: "translateX(10px)" }))
          ])
        ])
      ])
    ]),
    trigger('viewAnimation', [
      transition(':enter', [
        group([
          query('h2', [
            style({ transform: 'translateY(-20px' }),
            animate(1000)
          ])
        ])
      ])
    ])
  ]
})

export class ViewAllTopicsComponent implements OnInit {
  topic: Array<any> = []

  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.topicService.getAllTopic().subscribe(res => {
      this.topic = <any>res
      console.log(res)
    })
  }
  topics: any = []
  searchData(event: Event) {
    var text = (event.target as HTMLInputElement).value;
    this.topics = this.topic.filter(x => {
      return (x.topic.toLowerCase()).includes(text.toLowerCase());
    })
  }
}

 // trigger('viewAnimation', [
    //   transition(':enter', [
    //     group([
    //       query('h2', [
    //         style({ transform: "translateX(10px)" }),
    //         animate(1000)
    //       ]),
    //       query('@fadeIn', [
    //         stagger(2000, animateChild())
    //       ], {optional:true})
    //     ])
    //   ])
    // ]),
    // trigger('fadeIn', [
    //   transition(':enter', [
    //     style({opacity: 0}),
    //     animate(2000)
    //   ])
    // ])