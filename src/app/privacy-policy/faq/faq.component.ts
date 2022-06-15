import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: '#ccdceb', opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class FaqComponent implements OnInit {
  links = ['All', 'General', 'Account', 'Payment'];
  activeLink = this.links[0];
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
