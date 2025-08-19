import { Injectable } from '@angular/core';
import { StoryParserService } from './story-parser.service';
import { differenceInDays } from 'date-fns';
import { Sprint } from '../models/sprint.model';
import { defaultSprintLength } from './constants';
import { Backlog } from '../models/backlog.model';

@Injectable({
  providedIn: 'root'
})
export class AgileService {
  constructor(private readonly storyParser: StoryParserService) {
  }

  projectBacklogCompletion(backlog: Backlog, sprints: Sprint[]): number {
    const medianVelocity = this.calculateMedianVelocity(sprints);
    if (medianVelocity === 0) return -1;

    const storyPoints = this.parseStoryPoints(backlog.rawInput ?? '');
    return Math.floor(defaultSprintLength * (storyPoints / medianVelocity));
  }

  calculateMedianVelocity(sprints: Sprint[]): number {
    if (sprints.length === 0) return 0;

    const normalizedStoryPointsSum = sprints
      .map(this.setStoryPoints.bind(this))
      .map(this.normalizeStoryPoints.bind(this))
      .reduce((sum, previousValue) => sum + previousValue, 0);

    return normalizedStoryPointsSum / sprints.length;
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
    const sprintDays = differenceInDays(sprint.endDate!, sprint.startDate!);
    return sprint.storyPoints! * (defaultSprintLength / sprintDays);
  }
}
