import { TestBed } from '@angular/core/testing';
import { AgileService } from './agile.service';
import { StateService } from './state.service';
import { StoryParserService } from './story-parser.service';
import { Sprint } from '../models/sprint.model';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';

describe('AgileService', () => {
  let service: AgileService;

  beforeEach(() => {
    const stateSpy = {
      sprints: [],
      form: {
        valueChanges: of('')
      }
    } as unknown as StateService;

    TestBed.configureTestingModule({
      providers: [
        AgileService,
        {provide: StateService, useValue: stateSpy},
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
      endDate: new Date('2024-01-14'),
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
        endDate: new Date('2024-01-15'),
        rawInput: '[10] Story'
      },
      {
        id: uuidv4(),
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-29'),
        rawInput: '[20] Story'
      }
    ];
    const result = service.calculateMedianVelocity(sprints);
    expect(result).toBe(15);
  });
});
