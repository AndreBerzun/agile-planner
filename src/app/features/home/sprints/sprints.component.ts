import { Component } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { AgileService } from '../../../shared/services/agile.service';
import { map, Observable, startWith } from 'rxjs';
import { RetroCardModule } from '../../../shared/ui/retro-card';
import { RetroDatepickerComponent } from '../../../shared/ui/retro-datepicker/retro-datepicker.component';
import { CalculationPipe } from '../../../shared/pipes';
import { AsyncPipe } from '@angular/common';
import { StoryareaComponent } from '../../../shared/ui/storyarea/storyarea.component';

@Component({
  selector: 'app-sprints',
  imports: [
    FormsModule,
    CdkDragHandle,
    CdkDrag,
    CdkDropList,
    ReactiveFormsModule,
    RetroCardModule,
    RetroDatepickerComponent,
    CalculationPipe,
    AsyncPipe,
    StoryareaComponent
  ],
  templateUrl: './sprints.component.html'
})
export class SprintsComponent {
  readonly medianVelocity$: Observable<number>;

  constructor(readonly state: StateService, readonly agile: AgileService) {
    this.medianVelocity$ = this.state.form.valueChanges.pipe(
      startWith(this.state.form.value),
      map(() => agile.calculateMedianVelocity(this.state.sprints))
    )
  }

  onSprintDrop(event: CdkDragDrop<any[]>): void {
    this.state.sortSprints(event.previousIndex, event.currentIndex);
  }
}
