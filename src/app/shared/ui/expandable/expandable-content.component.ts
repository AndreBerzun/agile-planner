import { Component, Host, Optional } from '@angular/core';
import { ExpandableComponent } from './expandable.component';

@Component({
  selector: 'expandable-content',
  standalone: true,
  template: `
    <div
      class="expandable-content"
      [style.max-height]="parent.expanded ? 'initial' : parent.collapsedHeight"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class ExpandableContentComponent {
  constructor(@Optional() @Host() public parent: ExpandableComponent) {
  }
}
