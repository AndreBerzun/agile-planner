import { Injectable } from '@angular/core';
import { AppState } from '../models/app-state.model';
import { Project } from '../models/project.model';
import { Sprint } from '../models/sprint.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'agile_planner_state';
  private readonly LEGACY_PROJECT_NAME = 'Project';

  saveState(state: AppState): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  loadState(): AppState | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return null;
    }

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed.projects)) {
      const project = this.projectFromLegacyState(parsed, this.LEGACY_PROJECT_NAME);
      return {activeProjectId: project.id, projects: [project]};
    }

    const projects: Project[] = parsed.projects.map((project: any) => this.reviveProject(project));
    const activeProjectId = projects.some(project => project.id === parsed.activeProjectId)
      ? parsed.activeProjectId
      : projects[0]?.id;
    return projects.length > 0 ? {activeProjectId, projects} : null;
  }

  exportProject(project: Project): string {
    return JSON.stringify(project, null, 2);
  }

  importProject(jsonData: string, fallbackName: string): Project {
    try {
      const parsed = JSON.parse(jsonData);
      const project = Array.isArray(parsed.backlogs) || typeof parsed.storyAttic === 'string'
        ? this.projectFromLegacyState(parsed, fallbackName)
        : this.reviveProject({...parsed, name: parsed.name || fallbackName});
      return {...project, id: uuidv4()};
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('Invalid data format');
    }
  }

  private projectFromLegacyState(state: any, name: string): Project {
    const backlogTexts = [...(state.backlogs ?? []).map((backlog: any) => backlog.rawInput), state.storyAttic];
    return this.reviveProject({
      id: uuidv4(),
      name,
      currentSprint: state.currentSprint,
      backlog: backlogTexts.filter(text => !!text?.trim()).join('\n\n'),
      sprints: state.sprints
    });
  }

  private reviveProject(project: any): Project {
    if (!Array.isArray(project.sprints ?? [])) {
      throw new Error('Invalid data format');
    }

    return {
      id: project.id ?? uuidv4(),
      name: project.name ?? '',
      startingVelocity: Number(project.startingVelocity) || 0,
      currentSprint: project.currentSprint ? this.reviveSprint(project.currentSprint) : {id: uuidv4()},
      backlog: project.backlog ?? '',
      sprints: (project.sprints ?? []).map((sprint: any) => this.reviveSprint(sprint))
    };
  }

  private reviveSprint(sprint: any): Sprint {
    return {
      ...sprint,
      startDate: sprint.startDate ? new Date(sprint.startDate) : undefined,
      endDate: sprint.endDate ? new Date(sprint.endDate) : undefined
    };
  }
}
