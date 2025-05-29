import { Component, Signal } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { AgileService } from '../../../shared/services/agile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RetroCardModule } from '../../../shared/ui/retro-card';
import { RetroDatepickerComponent } from '../../../shared/ui/retro-datepicker/retro-datepicker.component';

@Component({
  selector: 'app-sprints',
  imports: [
    FormsModule,
    CdkDragHandle,
    CdkDrag,
    CdkDropList,
    ReactiveFormsModule,
    RetroCardModule,
    RetroDatepickerComponent
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
