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
    const expected = [{points: 5, title: 'Create login page', done: false}];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should parse multiple story lines', () => {
    const input = '[3] First story\n[8] Second story\n[2] Third story';
    const expected = [
      {points: 3, title: 'First story', done: false},
      {points: 8, title: 'Second story', done: false},
      {points: 2, title: 'Third story', done: false}
    ];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should ignore non-story lines', () => {
    const input = 'Sprint 1:\n[5] Story 1\nRandom text\n[3] Story 2\n\nComments here';
    const expected = [
      {points: 5, title: 'Story 1', done: false},
      {points: 3, title: 'Story 2', done: false}
    ];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should parse story points as numbers', () => {
    const input = '[05] Story with leading zero';
    const expected = [{points: 5, title: 'Story with leading zero', done: false}];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should parse fractional story points', () => {
    const input = '- [0.5] Half story\n- [1,5] Comma story';
    const expected = [{points: 0.5, title: 'Half story', done: false}, {points: 1.5, title: 'Comma story', done: false}];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should not count estimates inside headings', () => {
    const input = '# Phase [3] one\n[5] Story 1';
    const expected = [{points: 5, title: 'Story 1', done: false}];
    expect(service.parseStories(input)).toEqual(expected);
  });

  it('should keep the estimate of done stories and flag them', () => {
    const input = 'x [5] Done story\n  X [2] Also done\n[3] Open story\nxylophone [1] Open too';
    const expected = [
      {points: 5, title: 'Done story', done: true},
      {points: 2, title: 'Also done', done: true},
      {points: 3, title: 'Open story', done: false},
      {points: 1, title: 'Open too', done: false}
    ];
    expect(service.parseStories(input)).toEqual(expected);
  });
});
