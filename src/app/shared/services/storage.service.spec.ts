import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { newProject } from '../models/project.model';

describe('StorageService', () => {
  let service: StorageService;
  const legacyState = {
    currentSprint: null,
    sprints: [{id: 's1', startDate: '2026-09-20T22:00:00.000Z', endDate: '2026-09-26T22:00:00.000Z', rawInput: '[1] Done'}],
    backlogs: [{id: 'b1', rawInput: '# One', expanded: true}, {id: 'b2', rawInput: '# Two', expanded: false}],
    storyAttic: 'Attic'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should return null without saved state', () => {
    expect(service.loadState()).toBeNull();
  });

  it('should migrate a saved legacy state into one project', () => {
    localStorage.setItem('agile_planner_state', JSON.stringify(legacyState));

    const state = service.loadState()!;

    expect(state.projects.length).toBe(1);
    expect(state.activeProjectId).toBe(state.projects[0].id);
    expect(state.projects[0].currentSprint.id).toBeTruthy();
    expect(state.projects[0].backlog).toBe('# One\n\n# Two\n\nAttic');
    expect(state.projects[0].sprints[0].startDate).toEqual(new Date('2026-09-20T22:00:00.000Z'));
  });

  it('should round-trip saved projects', () => {
    const project = {...newProject('FisKarl'), startingVelocity: 6};
    service.saveState({activeProjectId: project.id, projects: [project]});

    expect(service.loadState()).toEqual({activeProjectId: project.id, projects: [project]});
  });

  it('should import a legacy export named after its file', () => {
    const project = service.importProject(JSON.stringify(legacyState), 'pet-fellows-revival-complete');

    expect(project.name).toBe('pet-fellows-revival-complete');
    expect(project.sprints.length).toBe(1);
    expect(project.startingVelocity).toBe(0);
  });

  it('should import an exported project under a new id', () => {
    const project = {...newProject('FisKarl'), startingVelocity: 6};

    const imported = service.importProject(service.exportProject(project), 'file-name');

    expect(imported).toEqual({...project, id: imported.id});
    expect(imported.id).not.toBe(project.id);
  });

  it('should reject invalid data', () => {
    expect(() => service.importProject('not json', 'x')).toThrow('Invalid data format');
  });
});
