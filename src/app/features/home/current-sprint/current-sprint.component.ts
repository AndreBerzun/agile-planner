import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../../shared/services/state.service';
import { AgileService } from '../../../shared/services/agile.service';
import { SprintFormModel } from '../../../shared/models/sprint.model';
import { RetroCardComponent } from '../../../shared/ui/retro-card/retro-card.component';
import { RetroCardModule } from '../../../shared/ui/retro-card';
import { StoryareaComponent } from '../../../shared/ui/storyarea/storyarea.component';

@Component({
  selector: 'app-current-sprint',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RetroCardModule,
    StoryareaComponent
  ],
  standalone: true,
  templateUrl: './current-sprint.component.html'
})
export class CurrentSprintComponent {
  readonly currentSprintForm: FormGroup<SprintFormModel>;

  constructor(readonly state: StateService, readonly agile: AgileService) {
    this.currentSprintForm = state.form.controls.currentSprint;
  }

  completeSprint(): void {
    if (!this.currentSprintForm.controls.rawInput?.value) {
      alert('Cannot complete empty sprint');
      return;
    }

    this.state.finishCurrentSprint();
  }
}
