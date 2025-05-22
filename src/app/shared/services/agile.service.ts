import { Injectable, Signal } from '@angular/core';
import { StoryParserService } from './story-parser.service';
import { StateService } from './state.service';
import { differenceInDays } from 'date-fns';
import { map } from 'rxjs';
import { Sprint } from '../models/sprint.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AgileService {
  readonly standardSprintDays = 14;
  readonly medianVelocity: Signal<number>;

  constructor(private readonly state: StateService, private readonly storyParser: StoryParserService) {
    this.medianVelocity = toSignal(
      this.state.form.valueChanges.pipe(map(() => this.calculateMedianVelocity(this.state.sprints))),
      {initialValue: this.calculateMedianVelocity(this.state.sprints)}
    );
  }

  calculateMedianVelocity(sprints: Sprint[]): number {
    if (sprints.length === 0) return 0;

    const normalizedStoryPointsSum = sprints
      .map(this.parseStoryPoints.bind(this))
      .map(this.normalizeStoryPoints.bind(this))
      .reduce((sum, previousValue) => sum + previousValue, 0);

    return Math.floor(normalizedStoryPointsSum / sprints.length);
  }

  private parseStoryPoints(sprint: Sprint): Sprint {
    sprint.storyPoints = this.storyParser.parseStories(sprint.rawInput)
      .map(story => story.points)
      .reduce((sum, previousValue) => sum + previousValue, 0);
    return sprint;
  }

  private normalizeStoryPoints(sprint: Sprint): number {
    const sprintDays = differenceInDays(sprint.endDate!, sprint.startDate!);
    return sprint.storyPoints! * (this.standardSprintDays / sprintDays);
  }
}
