import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('150ms', [
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
export class ViewTopicsComponent implements OnInit {
  topic: Array<any> = []
  lowValue: number = 0;
  highValue: number = 20;

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.topicService.getTopicByUserId().subscribe(res => {
      this.topic = <any>res
      console.log(res)
    })
  }
  onDelete(id: any) {
    this.topicService.deleteTopic(id).subscribe(
      res => {
        this.ngOnInit();
        this.snackbar.open(" Your Topic has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }, err => {
        console.log(err + 'I am error');
        this.snackbar.open("Failed to delete Topic", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
      }
    )
  }
  topics: any = []
  searchData(event: Event) {
    var text = (event.target as HTMLInputElement).value;
    this.topics = this.topic.filter(x => {
      return (x.topic.toLowerCase()).includes(text.toLowerCase());
    })
  }
}
