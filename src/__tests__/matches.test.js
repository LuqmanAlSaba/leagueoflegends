const {
  getDate,
  getDateSuffix,
  getMatchResult,
} = require('../commands/matches');

const DATE = { weekday: 'long', month: 'long', day: 'numeric' };
const NUM_DAY = { day: 'numeric' };
const DAY = { weekday: 'long' };
const TIME = { hour: '2-digit', minute: '2-digit' };

const match1 = {
  matchID: 1597953600000,
  status: 'CONCLUDED',
  match_type: 'BEST OF 1',
  time: '4:00 PM',
  team1: {
    name: '100 Thieves',
    abbreviatedName: '100',
    score: '1',
    color: '#41884d',
  },
  team2: {
    name: 'Cloud9',
    abbreviatedName: 'C9',
    score: '0',
    color: '#237cca',
  },
};

const match2 = {
  matchID: 1597953600000,
  status: 'CONCLUDED',
  match_type: 'BEST OF 1',
  time: '4:00 PM',
  team1: {
    name: 'Team Liquid',
    abbreviatedName: 'TL',
    score: '0',
    color: '#41884d',
  },
  team2: {
    name: 'TSM',
    abbreviatedName: 'TSM',
    score: '1',
    color: '#237cca',
  },
};

test('returns match date when it is the first match of the week', () => {
  const currentDate = new Date(match1.matchID).toLocaleString('en-US', DATE);
  const i = 0;
  const matchStartDate = match1.matchID;
  const match = {
    status: match1.status,
    date: new Date(matchStartDate).toLocaleString('en-US', DATE),
    day: new Date(matchStartDate).toLocaleString('en-US', NUM_DAY),
    weekday: new Date(matchStartDate).toLocaleString('en-US', DAY),
    time: new Date(matchStartDate).toLocaleString('en-US', TIME),
    team1: match1.team1,
    team2: match1.team2,
  };

  expect(getDate(match, currentDate, i)).toBe('Thursday, August 20');
});

test('returns empty string when current date is equal to the next matches date', () => {
  const currentDate = new Date(match1.matchID).toLocaleString('en-US', DATE);
  const i = 1;
  const matchStartDate = match1.matchID;
  const match = {
    status: match1.status,
    date: new Date(matchStartDate).toLocaleString('en-US', DATE),
    day: new Date(matchStartDate).toLocaleString('en-US', NUM_DAY),
    weekday: new Date(matchStartDate).toLocaleString('en-US', DAY),
    time: new Date(matchStartDate).toLocaleString('en-US', TIME),
    team1: match1.team1,
    team2: match1.team2,
  };

  expect(getDate(match, currentDate, i)).toBe('');
});

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
  expect(getMatchResult(match1)).toBe('100 Thieves');
});

test('returns the match result based on the match score', () => {
  expect(getMatchResult(match2)).toBe('TSM');
});
