import { Injectable } from '@angular/core';
import { Story } from '../models/app-state.model';
import { estimatePattern, isDone, isHeading } from './story-syntax';

@Injectable({
  providedIn: 'root'
})
export class StoryParserService {

  constructor() { }

  parseStories(rawInput?: string): Story[] {
    if (!rawInput) {
      return [];
    }

    const lines = rawInput.split('\n');
    const stories: Story[] = [];

    for (const line of lines) {
      const match = isHeading(line) ? null : line.trim().match(estimatePattern);
      if (match) {
        stories.push({
          points: parseFloat(match[1].replace(',', '.')),
          title: match[2].trim(),
          done: isDone(line)
        });
      }
    }

    return stories;
  }
}
