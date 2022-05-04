import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
