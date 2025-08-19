import { Component, inject } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RetroCardModule } from '../../../shared/ui/retro-card';
import { StoryareaComponent } from '../../../shared/ui/storyarea/storyarea.component';
import { ExpandableModule } from '../../../shared/ui/expandable';

@Component({
  selector: 'app-story-attic',
  imports: [
    ReactiveFormsModule,
    RetroCardModule,
    StoryareaComponent,
    ExpandableModule
  ],
  templateUrl: './story-attic.component.html'
})
export class StoryAtticComponent {
  readonly state = inject(StateService);
  expanded = true;
}
