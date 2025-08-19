import { Component, Input } from '@angular/core';

@Component({
  selector: 'expandable',
  standalone: true,
  template: `
    <div class="expandable" [class.expanded]="expanded">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .expandable {
      position: relative;
    }
  `
})
export class ExpandableComponent {
  @Input() expanded = true;
  @Input() collapsedHeight = '0';
}
