import { Component, inject, input, OnInit, output } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgileService } from '../../../../shared/services/agile.service';
import { BacklogFormModel, backlogFromForm } from '../../../../shared/models/backlog.model';
import { StateService } from '../../../../shared/services/state.service';
import { map, Observable, startWith } from 'rxjs';
import { RetroCardModule } from '../../../../shared/ui/retro-card';
import { AsyncPipe } from '@angular/common';
import { CalculationPipe } from '../../../../shared/pipes';
import { StoryareaComponent } from '../../../../shared/ui/storyarea/storyarea.component';
import { ExpandableModule } from '../../../../shared/ui/expandable';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDragHandle,
    ReactiveFormsModule,
    RetroCardModule,
    AsyncPipe,
    CalculationPipe,
    StoryareaComponent,
    ExpandableModule
  ],
  templateUrl: './backlog.component.html'
})
export class BacklogComponent implements OnInit {
  backlog = input.required<FormGroup<BacklogFormModel>>();
  remove = output<void>();
  private readonly state = inject(StateService);
  readonly agile = inject(AgileService);

  projectedCompletion$!: Observable<number>;
  parsedStoryPoints$!: Observable<number>;

  ngOnInit(): void {
    this.parsedStoryPoints$ = this.state.form.valueChanges.pipe(
      startWith(this.state.form.value),
      map(() => this.agile.parseStoryPoints(this.backlog().controls.rawInput?.value ?? ''))
    );
    this.projectedCompletion$ = this.state.form.valueChanges.pipe(
      startWith(this.state.form.value),
      map(() => this.agile.projectBacklogCompletion(backlogFromForm(this.backlog()), this.state.sprints))
    );
  }

  toggleExpanded(): void {
    const expandedControl = this.backlog().controls.expanded;
    expandedControl.setValue(!expandedControl.value);
  }
}
