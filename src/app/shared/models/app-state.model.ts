export type Story = {
  title: string;
  points: number;
}

export type Backlog = {
  id: string;
  name?: string;
  rawInput?: string;
}

export type Sprint = {
  id: string;
  startDate?: Date;
  endDate?: Date;
  rawInput?: string;
  storyPoints?: number;
}

export type AppState = {
  backlogs: Backlog[];
  sprints: Sprint[];
}
