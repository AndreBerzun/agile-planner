import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { StateService } from '../../../shared/services/state.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-backlogs',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CdkDragHandle,
    CdkDrag,
    CdkDropList,
    MatButtonModule
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
