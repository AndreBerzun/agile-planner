import { Injectable } from '@angular/core';
import { Story } from '../models/app-state.model';

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
    const regex = /\[(\d+)\]\s+(.*)/;
    const stories: Story[] = [];

    for (const line of lines) {
      const match = line.trim().match(regex);
      if (match) {
        stories.push({
          points: parseInt(match[1], 10),
          title: match[2].trim()
        });
      }
    }

    return stories;
  }
}
