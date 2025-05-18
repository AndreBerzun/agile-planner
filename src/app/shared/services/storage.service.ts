import { Injectable } from '@angular/core';
import { AppState } from '../models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'agile_planner_state';

  constructor() {
  }

  saveState(state: AppState): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  loadState(): AppState | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return null;
    }

    const state = this.parseJSONState(data);
    return state;
  }

  exportState(): string {
    const state = this.loadState();
    return JSON.stringify(state, null, 2);
  }

  importState(jsonData: string): void {
    try {
      const state = this.parseJSONState(jsonData);
      this.saveState(state);
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('Invalid data format');
    }
  }

  private parseJSONState(jsonData: string): AppState {
    const state = JSON.parse(jsonData);

    // Convert string dates back to Date objects
    if (state.sprints) {
      state.sprints = state.sprints.map((sprint: any) => ({
        ...sprint,
        startDate: new Date(sprint.startDate),
        endDate: new Date(sprint.endDate)
      }));
    }

    return state;
  }

  clearState(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
