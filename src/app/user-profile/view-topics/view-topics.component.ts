import { animate, query, stagger, style, transition, trigger, group, animateChild } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { TopicsService } from 'src/app/service/topics.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogueService } from 'src/app/service/mat-dialogue-service';

export interface TopicElement {
  topic: string;
  country: string;
  language: string;
  grade: string;
  position: number;
  index: number
}


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
        ], {optional: true})
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
export class ViewTopicsComponent implements AfterViewInit {

  displayedColumns: string[] = ['topic', 'country', 'language', 'grade', 'action'];
  topic: TopicElement[] = [];
  dataSource: MatTableDataSource<TopicElement>;
  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.topicService.getTopicByUserId().subscribe(res => {
      this.dataSource = new MatTableDataSource<TopicElement>(<any>res)
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.filteredData.length)
    })
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.ngOnInit()
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
