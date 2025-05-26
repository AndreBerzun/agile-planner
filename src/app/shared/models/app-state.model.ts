import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Backlog, BacklogFormModel, backlogFromForm, createBacklogForm } from './backlog.model';
import { createSprintForm, Sprint, SprintFormModel, sprintFromForm } from './sprint.model';
import { v4 as uuidv4 } from 'uuid';

export const initialState: AppState = {
  currentSprint: {id: uuidv4()},
  sprints: [],
  backlogs: [],
  storyAttic: ''
}

export type AppState = {
  currentSprint: Sprint;
  sprints: Sprint[];
  backlogs: Backlog[];
  storyAttic: string;
}

export type AppStateFormModel = {
  currentSprint: FormGroup<SprintFormModel>;
  sprints: FormArray<FormGroup<SprintFormModel>>;
  backlogs: FormArray<FormGroup<BacklogFormModel>>;
  storyAttic: FormControl<string | null>;
}

export function createAppStateForm(fb: FormBuilder, state: AppState): FormGroup<AppStateFormModel> {
  return fb.group<AppStateFormModel>({
    currentSprint: createSprintForm(fb, state.currentSprint),
    sprints: fb.array(state.sprints.map(sprint => createSprintForm(fb, sprint))),
    backlogs: fb.array(state.backlogs.map(backlog => createBacklogForm(fb, backlog))),
    storyAttic: fb.control(state.storyAttic)
  });
}

export function appStateFromForm(form: FormGroup<AppStateFormModel>): AppState {
  return {
    currentSprint: sprintFromForm(form.controls.currentSprint),
    sprints: form.controls.sprints.controls.map(sprint => sprintFromForm(sprint)),
    backlogs: form.controls.backlogs.controls.map(backlog => backlogFromForm(backlog)),
    storyAttic: form.controls.storyAttic.value ?? ''
  }
}

export type Story = {
  title: string;
  points: number;
}
