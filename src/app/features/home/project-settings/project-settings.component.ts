import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../../shared/services/state.service';
import { RetroCardModule } from '../../../shared/ui/retro-card';

@Component({
  selector: 'app-project-settings',
  imports: [
    ReactiveFormsModule,
    RetroCardModule
  ],
  templateUrl: './project-settings.component.html',
  styleUrl: './project-settings.component.scss'
})
export class ProjectSettingsComponent {
  readonly state = inject(StateService);
}
