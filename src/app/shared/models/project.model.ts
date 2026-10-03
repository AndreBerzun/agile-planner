import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createSprintForm, Sprint, SprintFormModel, sprintFromForm } from './sprint.model';
import { v4 as uuidv4 } from 'uuid';

export type Project = {
  id: string;
  name: string;
  startingVelocity: number;
  currentSprint: Sprint;
  backlog: string;
  sprints: Sprint[];
}

export type ProjectFormModel = {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  startingVelocity: FormControl<number | null>;
  currentSprint: FormGroup<SprintFormModel>;
  backlog: FormControl<string | null>;
  sprints: FormArray<FormGroup<SprintFormModel>>;
}

export function newProject(name: string): Project {
  return {
    id: uuidv4(),
    name,
    startingVelocity: 0,
    currentSprint: {id: uuidv4()},
    backlog: '',
    sprints: []
  };
}

export function createProjectForm(fb: FormBuilder, project: Project): FormGroup<ProjectFormModel> {
  return fb.group<ProjectFormModel>({
    id: fb.control(project.id),
    name: fb.control(project.name),
    startingVelocity: fb.control(project.startingVelocity),
    currentSprint: createSprintForm(fb, project.currentSprint),
    backlog: fb.control(project.backlog),
    sprints: fb.array(project.sprints.map(sprint => createSprintForm(fb, sprint)))
  });
}

export function projectFromForm(form: FormGroup<ProjectFormModel>): Project {
  return {
    id: form.controls.id.value!,
    name: form.controls.name.value ?? '',
    startingVelocity: form.controls.startingVelocity.value ?? 0,
    currentSprint: sprintFromForm(form.controls.currentSprint),
    backlog: form.controls.backlog.value ?? '',
    sprints: form.controls.sprints.controls.map(sprint => sprintFromForm(sprint))
  };
}
