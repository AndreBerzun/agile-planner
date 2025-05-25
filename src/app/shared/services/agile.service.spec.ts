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
      endDate: new Date('2024-01-8'),
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
        endDate: new Date('2024-01-08'),
        rawInput: '[10] Story'
      },
      {
        id: uuidv4(),
        startDate: new Date('2024-01-08'),
        endDate: new Date('2024-01-15'),
        rawInput: '[20] Story'
      }
    ];
    const result = service.calculateMedianVelocity(sprints);
    expect(result).toBe(15);
  });

  it('should return -1 for project completion with empty sprints', () => {
    const backlog = {id: uuidv4(), name: 'Test Backlog', rawInput: '[5] Story'};
    const result = service.projectBacklogCompletion(backlog, []);
    expect(result).toBe(-1);
  });

  it('should calculate project completion for single sprint', () => {
    const sprint: Sprint = {
      id: uuidv4(),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-08'),
      rawInput: '[5] Story'
    };
    const backlog = {id: uuidv4(), name: 'Test Backlog', rawInput: '[5] Story'};
    const result = service.projectBacklogCompletion(backlog, [sprint]);
    expect(result).toBe(7);
  });

  it('should calculate project completion for multiple sprints', () => {
    const sprints: Sprint[] = [
      {
        id: uuidv4(),
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-08'),
        rawInput: '[10] Story'
      },
      {
        id: uuidv4(),
        startDate: new Date('2024-01-08'),
        endDate: new Date('2024-01-15'),
        rawInput: '[20] Story'
      }
    ];
    const backlog = {
      id: uuidv4(),
      name: 'Test Backlog',
      rawInput: '[15] Story 1\n[30] Story 2'
    };
    const result = service.projectBacklogCompletion(backlog, sprints);
    expect(result).toBe(21);
  });
});
