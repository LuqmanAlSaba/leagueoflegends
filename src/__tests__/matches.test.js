const {getDateSuffix, getMatchResult} = require('../commands/matches');

const match1 = {
    matchID: 1597953600000,
    status: "CONCLUDED",
    match_type: "BEST OF 1",
    time: "4:00 PM",
    team1: {
        name: "100 Thieves",
        abbreviatedName: "100",
        score: "1",
        color: "#41884d"
    },
    team2: {
        name: "Cloud9",
        abbreviatedName: "C9",
        score: "0",
        color: "#237cca"
    }
};

const match2 = {
    matchID: 1597953600000,
    status: "CONCLUDED",
    match_type: "BEST OF 1",
    time: "4:00 PM",
    team1: {
        name: "Team Liquid",
        abbreviatedName: "TL",
        score: "0",
        color: "#41884d"
    },
    team2: {
        name: "TSM",
        abbreviatedName: "TSM",
        score: "1",
        color: "#237cca"
    }
};

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
