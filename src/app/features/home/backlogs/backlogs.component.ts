import { Component } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { BacklogComponent } from './backlog/backlog.component';


@Component({
  selector: 'app-backlogs',
  imports: [
    FormsModule,
    CdkDropList,
    ReactiveFormsModule,
    BacklogComponent
  ],
  templateUrl: './backlogs.component.html'
})
export class BacklogsComponent {
  constructor(readonly state: StateService) {
  }

  onBacklogDrop(event: CdkDragDrop<any[]>): void {
    this.state.sortBacklogs(event.previousIndex, event.currentIndex);
  }
}
