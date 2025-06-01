import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    StoryareaComponent
  ],
  templateUrl: './backlog.component.html'
})
export class BacklogComponent implements OnInit {
  @Input({required: true}) backlog!: FormGroup<BacklogFormModel>;
  @Output() remove = new EventEmitter<void>();

  projectedCompletion$!: Observable<number>;

  constructor(private readonly state: StateService, readonly agile: AgileService) {
  }

  ngOnInit(): void {
    this.projectedCompletion$ = this.state.form.valueChanges.pipe(
      startWith(this.state.form.value),
      map(() => this.agile.projectBacklogCompletion(backlogFromForm(this.backlog), this.state.sprints))
    );
  }
}
