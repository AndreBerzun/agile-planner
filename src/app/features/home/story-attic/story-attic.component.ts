import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StateService } from '../../../shared/services/state.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-story-attic',
  imports: [
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './story-attic.component.html'
})
export class StoryAtticComponent {
  constructor(readonly state: StateService) {
  }
}
