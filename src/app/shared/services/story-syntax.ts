export interface StorySegment {
  text: string;
  estimate: boolean;
}

export interface StoryLine {
  heading: boolean;
  done: boolean;
  segments: StorySegment[];
}

export const estimatePattern = /\[(\d+(?:[.,]\d+)?)\]\s+(.*)/;

const emptyLineFiller = '\u200b';

export function isHeading(line: string): boolean {
  return line.trimStart().startsWith('#');
}

export function isDone(line: string): boolean {
  return /^\s*x\s/i.test(line);
}

export function toStoryLines(rawInput: string): StoryLine[] {
  return rawInput.split('\n').map(toStoryLine);
}

function toStoryLine(line: string): StoryLine {
  if (line === '') {
    return {heading: false, done: false, segments: [{text: emptyLineFiller, estimate: false}]};
  }
  if (isHeading(line)) {
    return {heading: true, done: false, segments: [{text: line, estimate: false}]};
  }

  const done = isDone(line);
  const match = line.trimEnd().match(estimatePattern);
  if (!match) {
    return {heading: false, done, segments: [{text: line, estimate: false}]};
  }

  const start = match.index!;
  const end = start + match[1].length + 2;
  return {
    heading: false,
    done,
    segments: [
      {text: line.slice(0, start), estimate: false},
      {text: line.slice(start, end), estimate: true},
      {text: line.slice(end), estimate: false}
    ].filter(segment => segment.text !== '')
  };
}

export interface SprintSplit {
  done: string;
  open: string;
}

export function splitDone(rawInput: string): SprintSplit {
  const lines = rawInput.split('\n');
  return {
    done: tidy(lines.filter((_, index) => belongsToDone(lines, index))),
    open: tidy(lines.filter((_, index) => belongsToOpen(lines, index)))
  };
}

function belongsToDone(lines: string[], index: number): boolean {
  const line = lines[index];
  if (isBlank(line)) return true;
  if (isHeading(line)) return headingScope(lines, index).some(isDone);
  return isDone(line);
}

function belongsToOpen(lines: string[], index: number): boolean {
  const line = lines[index];
  if (isBlank(line)) return true;
  if (isHeading(line)) {
    const scope = headingScope(lines, index);
    return scope.some(isOpenEntry) || !scope.some(isDone);
  }
  return !isDone(line);
}

function headingScope(lines: string[], index: number): string[] {
  const level = headingLevel(lines[index]);
  const following = lines.slice(index + 1);
  const end = following.findIndex(line => isHeading(line) && headingLevel(line) <= level);
  return end === -1 ? following : following.slice(0, end);
}

function headingLevel(line: string): number {
  return line.trimStart().match(/^#+/)![0].length;
}

function isOpenEntry(line: string): boolean {
  return !isBlank(line) && !isHeading(line) && !isDone(line);
}

function isBlank(line: string): boolean {
  return line.trim() === '';
}

function tidy(lines: string[]): string {
  const kept = lines.filter((line, index) => !isBlank(line) || (index > 0 && !isBlank(lines[index - 1])));
  if (kept.length > 0 && isBlank(kept[kept.length - 1])) kept.pop();
  return kept.join('\n');
}
