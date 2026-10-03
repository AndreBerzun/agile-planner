import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createProjectForm, newProject, Project, ProjectFormModel, projectFromForm } from './project.model';

export const defaultProjectName = 'New_Project';

export type AppState = {
  activeProjectId: string;
  projects: Project[];
}

export type AppStateFormModel = {
  activeProjectId: FormControl<string | null>;
  projects: FormArray<FormGroup<ProjectFormModel>>;
}

export function initialState(): AppState {
  const project = newProject(defaultProjectName);
  return {activeProjectId: project.id, projects: [project]};
}

export function createAppStateForm(fb: FormBuilder, state: AppState): FormGroup<AppStateFormModel> {
  return fb.group<AppStateFormModel>({
    activeProjectId: fb.control(state.activeProjectId),
    projects: fb.array(state.projects.map(project => createProjectForm(fb, project)))
  });
}

export function appStateFromForm(form: FormGroup<AppStateFormModel>): AppState {
  return {
    activeProjectId: form.controls.activeProjectId.value!,
    projects: form.controls.projects.controls.map(project => projectFromForm(project))
  };
}

export type Story = {
  title: string;
  points: number;
  done: boolean;
}
