import { Component, Signal } from '@angular/core';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { StateService } from '../../../shared/services/state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgileService } from '../../../shared/services/agile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-sprints',
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
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './sprints.component.html'
})
export class SprintsComponent {
  readonly medianVelocity: Signal<number>;

  constructor(readonly state: StateService, readonly agile: AgileService) {
    this.medianVelocity = toSignal(
      this.state.form.valueChanges.pipe(map(() => agile.calculateMedianVelocity(this.state.sprints))),
      {initialValue: agile.calculateMedianVelocity(this.state.sprints)}
    );
  }

  onSprintDrop(event: CdkDragDrop<any[]>): void {
    this.state.sortSprints(event.previousIndex, event.currentIndex);
  }
}
