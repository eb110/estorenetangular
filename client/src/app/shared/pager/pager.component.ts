import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() totalCount?: number;
  @Input() pageSize?: number;

  //the page number -> have to send it back to the parrent component
  //as based on this number the api call is going to take a place
  @Output() pageChanged = new EventEmitter<number>();

  onPagerChanged(event: any){
    this.pageChanged.emit(event.page);
  }
}
