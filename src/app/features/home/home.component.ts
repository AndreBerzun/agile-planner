import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BacklogsComponent } from './backlogs/backlogs.component';
import { SprintsComponent } from './sprints/sprints.component';
import { StateService } from '../../shared/services/state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StoryAtticComponent } from './story-attic/story-attic.component';
import { CurrentSprintComponent } from './current-sprint/current-sprint.component';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    BacklogsComponent,
    SprintsComponent,
    ReactiveFormsModule,
    StoryAtticComponent,
    CurrentSprintComponent
  ],
  templateUrl: './home.component.html',
  standalone: true
})
export class HomeComponent {
  constructor(readonly state: StateService) {
  }
}
