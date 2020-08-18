const { getDateSuffix, getMatchResult } = require('../commands/matches');

test('returns suffix for the given date', () => {
  expect(getDateSuffix(21)).toBe('st');
});

test('returns suffix for the given date', () => {
  expect(getDateSuffix(2)).toBe('nd');
});

test('returns suffix for the given date', () => {
  expect(getDateSuffix(3)).toBe('rd');
});

test('returns suffix for the given date', () => {
  expect(getDateSuffix(11)).toBe('th');
});

test('returns the match result based on the match score', () => {
  expect(getMatchResult(1, 4, 'PENDING')).toBe('Team 2');
});

test('returns the match result based on the match score', () => {
  expect(getMatchResult(3, 2, 'PENDING')).toBe('Team 1');
});

test('returns the match result based on the match score', () => {
  expect(getMatchResult(2, 2, 'PENDING')).toBe('');
});

test('returns the match result based on the match score', () => {
  expect(getMatchResult(3, 2, 'IN_PROGRESS')).toBe('');
});
