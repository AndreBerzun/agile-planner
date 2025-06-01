import { Component } from '@angular/core';
import { BacklogsComponent } from './backlogs/backlogs.component';
import { SprintsComponent } from './sprints/sprints.component';
import { StateService } from '../../shared/services/state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StoryAtticComponent } from './story-attic/story-attic.component';
import { CurrentSprintComponent } from './current-sprint/current-sprint.component';
import { HeaderComponent } from './header/header.component';
import { StorageComponent } from './storage/storage.component';

@Component({
  selector: 'app-home',
  imports: [
    BacklogsComponent,
    SprintsComponent,
    ReactiveFormsModule,
    StoryAtticComponent,
    CurrentSprintComponent,
    HeaderComponent,
    StorageComponent
  ],
  templateUrl: './home.component.html',
  standalone: true
})
export class HomeComponent {
  constructor(readonly state: StateService) {
  }
}
