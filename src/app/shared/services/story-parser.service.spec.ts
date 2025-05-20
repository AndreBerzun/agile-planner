import { TestBed } from '@angular/core/testing';

import { StoryParserService } from './story-parser.service';

describe('StoriesParserService', () => {
  let service: StoryParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse empty input', () => {
    expect(service.parseStories('')).toEqual([]);
    expect(service.parseStories(undefined)).toEqual([]);
  });

  it('should parse single story line', () => {
    const input = '[5] Create login page';
    const expected = [{points: 5, title: 'Create login page'}];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should parse multiple story lines', () => {
    const input = '[3] First story\n[8] Second story\n[2] Third story';
    const expected = [
      {points: 3, title: 'First story'},
      {points: 8, title: 'Second story'},
      {points: 2, title: 'Third story'}
    ];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should ignore non-story lines', () => {
    const input = 'Sprint 1:\n[5] Story 1\nRandom text\n[3] Story 2\n\nComments here';
    const expected = [
      {points: 5, title: 'Story 1'},
      {points: 3, title: 'Story 2'}
    ];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should parse story points as numbers', () => {
    const input = '[05] Story with leading zero';
    const expected = [{points: 5, title: 'Story with leading zero'}];
    expect(service.parseStories(input)).toEqual(expected);
  });
});

