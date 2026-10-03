import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { StateService } from '../../../shared/services/state.service';
import { AgileService } from '../../../shared/services/agile.service';
import { RetroCardModule } from '../../../shared/ui/retro-card';
import { CalculationPipe } from '../../../shared/pipes';
import { StoryareaComponent } from '../../../shared/ui/storyarea/storyarea.component';
import { ExpandableModule } from '../../../shared/ui/expandable';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    RetroCardModule,
    AsyncPipe,
    CalculationPipe,
    StoryareaComponent,
    ExpandableModule
  ],
  templateUrl: './backlog.component.html'
})
export class BacklogComponent {
  readonly state = inject(StateService);
  private readonly agile = inject(AgileService);
  expanded = true;

  readonly storyPoints$: Observable<number> = this.state.form.valueChanges.pipe(
    startWith(null),
    map(() => this.agile.parseOpenStoryPoints(this.state.project.backlog))
  );

  readonly projectedCompletion$: Observable<number> = this.state.form.valueChanges.pipe(
    startWith(null),
    map(() => this.state.project),
    map(project => this.agile.projectBacklogCompletion(project.backlog, project.sprints, project.startingVelocity))
  );
}
