import { toStoryLines } from './story-syntax';

describe('toStoryLines', () => {
  it('should mark lines starting with # as headings', () => {
    expect(toStoryLines('# Login\n  ## Nested')).toEqual([
      {heading: true, done: false, segments: [{text: '# Login', estimate: false}]},
      {heading: true, done: false, segments: [{text: '  ## Nested', estimate: false}]}
    ]);
  });

  it('should split a story line around its estimate', () => {
    expect(toStoryLines('- [1,5] Create login page')).toEqual([
      {
        heading: false,
        done: false,
        segments: [
          {text: '- ', estimate: false},
          {text: '[1,5]', estimate: true},
          {text: ' Create login page', estimate: false}
        ]
      }
    ]);
  });

  it('should not mark brackets that do not count as an estimate', () => {
    expect(toStoryLines('[5]\n[x] done\nplain')).toEqual([
      {heading: false, done: false, segments: [{text: '[5]', estimate: false}]},
      {heading: false, done: false, segments: [{text: '[x] done', estimate: false}]},
      {heading: false, done: false, segments: [{text: 'plain', estimate: false}]}
    ]);
  });

  it('should not mark estimates inside headings', () => {
    expect(toStoryLines('# Phase [3] one')).toEqual([
      {heading: true, done: false, segments: [{text: '# Phase [3] one', estimate: false}]}
    ]);
  });

  it('should keep one line per input line so the layer height matches the text', () => {
    const lines = toStoryLines('[3] a\n\n');
    expect(lines.length).toBe(3);
    expect(lines[1].segments).toEqual([{text: '\u200b', estimate: false}]);
  });

  it('should preserve every character of the input', () => {
    const input = '  - [8] Story   \n# Heading \ntext [2] more [3] text';
    const rebuilt = toStoryLines(input)
      .map(line => line.segments.map(segment => segment.text).join(''))
      .join('\n');
    expect(rebuilt).toBe(input);
  });

  it('should mark lines starting with x as done and keep their estimate', () => {
    expect(toStoryLines('x [5] Shipped')).toEqual([
      {
        heading: false,
        done: true,
        segments: [
          {text: 'x ', estimate: false},
          {text: '[5]', estimate: true},
          {text: ' Shipped', estimate: false}
        ]
      }
    ]);
  });
});
