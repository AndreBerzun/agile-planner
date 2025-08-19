import { Component } from '@angular/core';

@Component({
  selector: 'expandable-header',
  standalone: true,
  template: `
    <div class="expandable-header">
      <ng-content></ng-content>
    </div>
  `
})
export class ExpandableHeaderComponent {
}
