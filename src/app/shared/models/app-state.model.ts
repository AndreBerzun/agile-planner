import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Backlog, BacklogFormModel, backlogFromForm, createBacklogForm } from './backlog.model';
import { createSprintForm, Sprint, SprintFormModel, sprintFromForm } from './sprint.model';

export const initialState: AppState = {
  backlogs: [],
  sprints: [],
  storyAttic: ''
}

export type AppState = {
  backlogs: Backlog[];
  sprints: Sprint[];
  storyAttic: string;
}

export type AppStateFormModel = {
  backlogs: FormArray<FormGroup<BacklogFormModel>>;
  sprints: FormArray<FormGroup<SprintFormModel>>;
  storyAttic: FormControl<string | null>;
}

export function createAppStateForm(fb: FormBuilder, state: AppState): FormGroup<AppStateFormModel> {
  return fb.group<AppStateFormModel>({
    backlogs: fb.array(state.backlogs.map(backlog => createBacklogForm(fb, backlog))),
    sprints: fb.array(state.sprints.map(sprint => createSprintForm(fb, sprint))),
    storyAttic: fb.control(state.storyAttic)
  });
}

export function appStateFromForm(form: FormGroup<AppStateFormModel>): AppState {
  return {
    backlogs: form.controls.backlogs.controls.map(backlog => backlogFromForm(backlog)),
    sprints: form.controls.sprints.controls.map(sprint => sprintFromForm(sprint)),
    storyAttic: form.controls.storyAttic.value ?? ''
  }
}

export type Story = {
  title: string;
  points: number;
}
