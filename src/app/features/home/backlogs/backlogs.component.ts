import { Component, inject } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { BacklogComponent } from './backlog/backlog.component';
import { ExpandableModule } from '../../../shared/ui/expandable';


@Component({
  selector: 'app-backlogs',
  imports: [
    FormsModule,
    CdkDropList,
    ReactiveFormsModule,
    BacklogComponent,
    ExpandableModule
  ],
  templateUrl: './backlogs.component.html'
})
export class BacklogsComponent {
  readonly state = inject(StateService);
  expanded = true;

  onBacklogDrop(event: CdkDragDrop<any[]>): void {
    this.state.sortBacklogs(event.previousIndex, event.currentIndex);
  }
}
