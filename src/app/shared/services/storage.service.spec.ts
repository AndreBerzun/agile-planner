import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle import with null currentSprint', () => {
    const jsonWithNullCurrentSprint = JSON.stringify({
      currentSprint: null,
      sprints: [],
      backlogs: [],
      storyAttic: ''
    });

    service.importState(jsonWithNullCurrentSprint);

    const loadedState = service.loadState();
    expect(loadedState).toBeTruthy();
    expect(loadedState?.currentSprint).toBeTruthy();
    expect(loadedState?.currentSprint.id).toBeTruthy();
  });
});
