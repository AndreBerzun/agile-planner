import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StateService } from '../../../shared/services/state.service';
import { AgileService } from '../../../shared/services/agile.service';
import { SprintFormModel } from '../../../shared/models/sprint.model';

@Component({
  selector: 'app-current-sprint',
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
    MatButtonModule,
    ReactiveFormsModule
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
