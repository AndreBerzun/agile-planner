import { Injectable } from '@angular/core';
import { AppStateFormModel, appStateFromForm, createAppStateForm, initialState } from '../models/app-state.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Backlog, createBacklogForm } from '../models/backlog.model';
import { createSprintForm, Sprint, sprintFromForm } from '../models/sprint.model';
import { defaultSprintLength } from './constants';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  readonly form: FormGroup<AppStateFormModel>;

  get backlogs(): Backlog[] {
    return appStateFromForm(this.form).backlogs;
  }

  get sprints(): Sprint[] {
    return appStateFromForm(this.form).sprints;
  }

  constructor(private readonly fb: FormBuilder, private readonly storageService: StorageService) {
    const savedState = this.storageService.loadState();
    this.form = createAppStateForm(this.fb, savedState ?? initialState);
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(_ => this.storageService.saveState(appStateFromForm(this.form)));
  }

  addBacklog(): void {
    this.form.controls.backlogs.push(createBacklogForm(this.fb, {id: uuidv4()}));
  }

  sortBacklogs(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.form.controls.backlogs.controls, previousIndex, currentIndex);
  }

  removeBacklog(id: string): void {
    const backlogs = this.form.controls.backlogs;
    const index = backlogs.controls.findIndex(backlog => backlog.value.id === id);
    backlogs.removeAt(index);
  }

  addSprint(): void {
    this.form.controls.sprints.push(createSprintForm(this.fb, {
      id: uuidv4(),
      startDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + defaultSprintLength))
    }));
  }

  sortSprints(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.form.controls.sprints.controls, previousIndex, currentIndex);
  }

  removeSprint(id: string): void {
    const sprints = this.form.controls.sprints;
    const index = sprints.controls.findIndex(sprint => sprint.value.id === id);
    sprints.removeAt(index);
  }

  finishCurrentSprint(): void {
    const currentSprint = sprintFromForm(this.form.controls.currentSprint);
    currentSprint.startDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1));
    currentSprint.endDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + defaultSprintLength));

    this.form.controls.sprints.insert(0, createSprintForm(this.fb, currentSprint));
    this.form.controls.currentSprint.reset({id: uuidv4()});
  }
}
