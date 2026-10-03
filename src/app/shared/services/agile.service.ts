import { Injectable } from '@angular/core';
import { StoryParserService } from './story-parser.service';
import { differenceInCalendarDays } from 'date-fns';
import { Sprint } from '../models/sprint.model';
import { defaultSprintLength } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AgileService {
  constructor(private readonly storyParser: StoryParserService) {
  }

  projectBacklogCompletion(backlog: string, sprints: Sprint[], startingVelocity = 0): number {
    const medianVelocity = this.calculateMedianVelocity(sprints, startingVelocity);
    if (medianVelocity === 0) return -1;

    const storyPoints = this.parseStoryPoints(backlog);
    return Math.ceil(defaultSprintLength * (storyPoints / medianVelocity));
  }

  calculateMedianVelocity(sprints: Sprint[], startingVelocity = 0): number {
    const velocities = sprints
      .map(this.setStoryPoints.bind(this))
      .map(this.normalizeStoryPoints.bind(this));
    if (startingVelocity > 0) velocities.push(startingVelocity);
    if (velocities.length === 0) return 0;

    return velocities.reduce((sum, previousValue) => sum + previousValue, 0) / velocities.length;
  }

  private setStoryPoints(sprint: Sprint): Sprint {
    sprint.storyPoints = this.parseStoryPoints(sprint.rawInput ?? '');
    return sprint;
  }

  parseStoryPoints(rawInput: string): number {
    return this.storyParser.parseStories(rawInput)
      .map(story => story.points)
      .reduce((sum, previousValue) => sum + previousValue, 0);
  }

  private normalizeStoryPoints(sprint: Sprint): number {
    if (!sprint.startDate || !sprint.endDate) return sprint.storyPoints!;

    const sprintDays = Math.max(1, differenceInCalendarDays(sprint.endDate, sprint.startDate) + 1);
    return sprint.storyPoints! * (defaultSprintLength / sprintDays);
  }
}
