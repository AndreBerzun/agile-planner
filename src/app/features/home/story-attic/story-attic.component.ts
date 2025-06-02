import { Component } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RetroCardModule } from '../../../shared/ui/retro-card';
import { StoryareaComponent } from '../../../shared/ui/storyarea/storyarea.component';

@Component({
  selector: 'app-story-attic',
  imports: [
    ReactiveFormsModule,
    RetroCardModule,
    StoryareaComponent
  ],
  templateUrl: './story-attic.component.html'
})
export class StoryAtticComponent {
  constructor(readonly state: StateService) {
  }
}
