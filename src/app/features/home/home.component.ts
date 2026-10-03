import { Component } from '@angular/core';
import { SprintsComponent } from './sprints/sprints.component';
import { StateService } from '../../shared/services/state.service';
import { CurrentSprintComponent } from './current-sprint/current-sprint.component';
import { HeaderComponent } from './header/header.component';
import { StorageComponent } from './storage/storage.component';
import { BacklogComponent } from './backlog/backlog.component';
import { ProjectTabsComponent } from './project-tabs/project-tabs.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';

@Component({
  selector: 'app-home',
  imports: [
    BacklogComponent,
    SprintsComponent,
    CurrentSprintComponent,
    HeaderComponent,
    StorageComponent,
    ProjectTabsComponent,
    ProjectSettingsComponent
  ],
  templateUrl: './home.component.html',
  standalone: true
})
export class HomeComponent {
  constructor(readonly state: StateService) {
  }
}
