import { computed, effect, Injectable, signal } from '@angular/core';
import { AppState } from '../models/app-state.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { moveItemInArray } from '@angular/cdk/drag-drop';

const initialState: AppState = {
  backlogs: [],
  sprints: []
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly state = initialState;
  private appStateSignal = signal<AppState>(this.state);
  readonly backlogs = computed(() => this.appStateSignal().backlogs);
  readonly sprints = computed(() => this.appStateSignal().sprints);

  constructor(private readonly storageService: StorageService) {
    const savedState = this.storageService.loadState();
    if (savedState) {
      this.state = savedState;
      this.appStateSignal.set(this.state);
    }

    effect(() => {
      this.storageService.saveState(this.appStateSignal());
    });
  }

  addBacklog(): void {
    this.state.backlogs.unshift({id: uuidv4()});
    this.appStateSignal.set({...this.state});
  }

  sortBacklogs(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.state.backlogs, previousIndex, currentIndex);
    this.appStateSignal.set({...this.state});
  }

  removeBacklog(id: string): void {
    this.state.backlogs = this.state.backlogs.filter(backlog => backlog.id !== id);
    this.appStateSignal.set({...this.state});
  }

  addSprint(): void {
    this.state.sprints.push({
      id: uuidv4(),
      startDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))
    });
    this.appStateSignal.set({...this.state});
  }

  sortSprints(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.state.sprints, previousIndex, currentIndex);
    this.appStateSignal.set({...this.state});
  }

  removeSprint(id: string): void {
    this.state.sprints = this.state.sprints.filter(sprint => sprint.id !== id);
    this.appStateSignal.set({...this.state});
  }
}
