import { Injectable } from '@angular/core';
import { AppStateFormModel, appStateFromForm, createAppStateForm, defaultProjectName, initialState } from '../models/app-state.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createSprintForm, Sprint, sprintFromForm } from '../models/sprint.model';
import { createProjectForm, newProject, Project, ProjectFormModel, projectFromForm } from '../models/project.model';
import { closingWeek } from './sprint-week';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  readonly root: FormGroup<AppStateFormModel>;

  get projects(): FormGroup<ProjectFormModel>[] {
    return this.root.controls.projects.controls;
  }

  get activeProjectId(): string {
    return this.root.controls.activeProjectId.value!;
  }

  get form(): FormGroup<ProjectFormModel> {
    return this.projects.find(project => project.controls.id.value === this.activeProjectId) ?? this.projects[0];
  }

  get project(): Project {
    return projectFromForm(this.form);
  }

  get sprints(): Sprint[] {
    return this.project.sprints;
  }

  constructor(private readonly fb: FormBuilder, private readonly storageService: StorageService) {
    const savedState = this.storageService.loadState();
    this.root = createAppStateForm(this.fb, savedState ?? initialState());
    this.root.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(_ => this.storageService.saveState(appStateFromForm(this.root)));
    this.storageService.saveState(appStateFromForm(this.root));
  }

  selectProject(id: string): void {
    this.root.controls.activeProjectId.setValue(id);
  }

  addProject(project: Project = newProject(defaultProjectName)): void {
    this.root.controls.projects.push(createProjectForm(this.fb, project));
    this.selectProject(project.id);
  }

  sortProjects(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.projects, previousIndex, currentIndex);
    this.root.controls.projects.updateValueAndValidity();
  }

  removeActiveProject(): void {
    const projects = this.root.controls.projects;
    const index = this.projects.indexOf(this.form);
    projects.removeAt(index);

    if (projects.length === 0) {
      this.addProject();
      return;
    }
    this.selectProject(this.projects[Math.max(0, index - 1)].controls.id.value!);
  }

  addSprint(): void {
    this.form.controls.sprints.insert(0, createSprintForm(this.fb, {id: uuidv4(), ...closingWeek(new Date())}));
  }

  sortSprints(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.form.controls.sprints.controls, previousIndex, currentIndex);
    this.form.controls.sprints.updateValueAndValidity();
  }

  removeSprint(id: string): void {
    const sprints = this.form.controls.sprints;
    const index = sprints.controls.findIndex(sprint => sprint.value.id === id);
    sprints.removeAt(index);
  }

  finishCurrentSprint(): void {
    const finishedSprint = {...sprintFromForm(this.form.controls.currentSprint), ...closingWeek(new Date())};

    this.form.controls.sprints.insert(0, createSprintForm(this.fb, finishedSprint));
    this.form.controls.currentSprint.reset({id: uuidv4()});
  }
}
