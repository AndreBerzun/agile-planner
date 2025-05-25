import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgileService } from '../../../../shared/services/agile.service';
import { BacklogFormModel, backlogFromForm } from '../../../../shared/models/backlog.model';
import { MatIcon } from '@angular/material/icon';
import { StateService } from '../../../../shared/services/state.service';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-backlog',
  imports: [
    CdkDrag,
    CdkDragHandle,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './backlog.component.html'
})
export class BacklogComponent implements OnInit {
  @Input({required: true}) backlog!: FormGroup<BacklogFormModel>;
  @Output() remove = new EventEmitter<void>();

  projectedCompletion!: Observable<number>;

  constructor(private readonly state: StateService, readonly agile: AgileService) {
  }

  ngOnInit(): void {
    this.projectedCompletion = this.state.form.valueChanges.pipe(
      startWith(this.state.form.value),
      map(() => this.agile.projectBacklogCompletion(backlogFromForm(this.backlog), this.state.sprints))
    );
  }
}
