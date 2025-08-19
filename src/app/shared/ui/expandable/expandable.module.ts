import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable.component';
import { ExpandableHeaderComponent } from './expandable-header.component';
import { ExpandableContentComponent } from './expandable-content.component';

@NgModule({
  imports: [
    ExpandableComponent,
    ExpandableHeaderComponent,
    ExpandableContentComponent
  ],
  exports: [
    ExpandableComponent,
    ExpandableHeaderComponent,
    ExpandableContentComponent
  ]
})
export class ExpandableModule {
}
