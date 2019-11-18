import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {ObservableUnsubscribe} from "../decorators/unsubscribe.decorator";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
@ObservableUnsubscribe({exclusionList: []})
export class StartComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  constructor() { }

  ngOnInit() {
    this.sub = interval(1000).subscribe((data: number) => console.log(data));
  }

  ngOnDestroy() {}
}
