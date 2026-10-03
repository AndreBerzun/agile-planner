import { Component, inject } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { StateService } from '../../../shared/services/state.service';

@Component({
  selector: 'app-project-tabs',
  imports: [
    CdkDrag,
    CdkDropList
  ],
  templateUrl: './project-tabs.component.html',
  styleUrl: './project-tabs.component.scss'
})
export class ProjectTabsComponent {
  readonly state = inject(StateService);

  onProjectDrop(event: CdkDragDrop<any[]>): void {
    this.state.sortProjects(event.previousIndex, event.currentIndex);
  }
}
