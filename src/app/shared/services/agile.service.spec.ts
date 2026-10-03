import { TestBed } from '@angular/core/testing';
import { AgileService } from './agile.service';
import { StoryParserService } from './story-parser.service';
import { Sprint } from '../models/sprint.model';
import { v4 as uuidv4 } from 'uuid';

describe('AgileService', () => {
  let service: AgileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AgileService,
        {provide: StoryParserService, useValue: new StoryParserService()}
      ]
    });

    service = TestBed.inject(AgileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 for empty sprints array', () => {
    const result = service.calculateMedianVelocity([]);
    expect(result).toBe(0);
  });

  it('should calculate median velocity for single sprint', () => {
    const sprint: Sprint = {
      id: uuidv4(),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-07'),
      rawInput: '[5] Story'
    };
    const result = service.calculateMedianVelocity([sprint]);
    expect(result).toBe(5);
  });

  it('should calculate median velocity for multiple sprints', () => {
    const sprints: Sprint[] = [
      {
        id: uuidv4(),
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-07'),
        rawInput: '[10] Story'
      },
      {
        id: uuidv4(),
        startDate: new Date('2024-01-08'),
        endDate: new Date('2024-01-14'),
        rawInput: '[20] Story'
      }
    ];
    const result = service.calculateMedianVelocity(sprints);
    expect(result).toBe(15);
  });

  it('should return -1 for project completion with empty sprints', () => {
    const backlog = '[5] Story';
    const result = service.projectBacklogCompletion(backlog, []);
    expect(result).toBe(-1);
  });

  it('should calculate project completion for single sprint', () => {
    const sprint: Sprint = {
      id: uuidv4(),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-07'),
      rawInput: '[5] Story'
    };
    const backlog = '[5] Story';
    const result = service.projectBacklogCompletion(backlog, [sprint]);
    expect(result).toBe(7);
  });

  it('should calculate project completion for multiple sprints', () => {
    const sprints: Sprint[] = [
      {
        id: uuidv4(),
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-07'),
        rawInput: '[10] Story'
      },
      {
        id: uuidv4(),
        startDate: new Date('2024-01-08'),
        endDate: new Date('2024-01-14'),
        rawInput: '[20] Story'
      }
    ];
    const backlog = '[15] Story 1\n[30] Story 2';
    const result = service.projectBacklogCompletion(backlog, sprints);
    expect(result).toBe(21);
  });

  it('should use the starting velocity while there are no sprints', () => {
    expect(service.calculateMedianVelocity([], 6)).toBe(6);
    expect(service.projectBacklogCompletion('[12] Story', [], 6)).toBe(14);
  });

  it('should count the starting velocity as one more sprint', () => {
    const sprint: Sprint = {
      id: uuidv4(),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-07'),
      rawInput: '[10] Story'
    };
    expect(service.calculateMedianVelocity([sprint], 6)).toBe(8);
  });

  it('should count a Monday to Sunday sprint as a full week', () => {
    const sprint: Sprint = {
      id: uuidv4(),
      startDate: new Date(2026, 8, 28),
      endDate: new Date(2026, 9, 4),
      rawInput: '[3] Story'
    };
    expect(service.calculateMedianVelocity([sprint])).toBe(3);
  });

  it('should scale a two week sprint down to one week', () => {
    const sprint: Sprint = {
      id: uuidv4(),
      startDate: new Date(2026, 8, 21),
      endDate: new Date(2026, 9, 4),
      rawInput: '[6] Story'
    };
    expect(service.calculateMedianVelocity([sprint])).toBe(3);
  });

  it('should take a sprint without dates as one week', () => {
    expect(service.calculateMedianVelocity([{id: uuidv4(), rawInput: '[4] Story'}])).toBe(4);
  });

  it('should round the projected completion up to whole days', () => {
    expect(service.projectBacklogCompletion('[4] Story', [], 3)).toBe(10);
  });

  it('should leave done stories out of the open backlog points', () => {
    expect(service.parseOpenStoryPoints('x [5] Done\n[3] Open')).toBe(3);
    expect(service.projectBacklogCompletion('x [8] Done\n[4] Story', [], 3)).toBe(10);
  });

  it('should count done stories towards sprint velocity', () => {
    expect(service.parseStoryPoints('x [5] Done\n[3] Open')).toBe(8);
  });
});
