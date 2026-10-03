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
