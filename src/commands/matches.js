const chalk = require('chalk');
const ora = require('ora');
const { left, right, center } = require('wide-align');
const fetch = require('node-fetch');

const DATE = { weekday: 'long', month: 'long', day: 'numeric' };
const shortDate = { month: 'long', day: 'numeric' };
const NUM_DAY = { day: 'numeric' };
const DAY = { weekday: 'long' };
const TIME = { hour: '2-digit', minute: '2-digit' };

const TEAM_WIDTH = 22;
const STATUS_WIDTH = 20;
const TABLE_WIDTH = TEAM_WIDTH + STATUS_WIDTH + TEAM_WIDTH;

const formatStatus = (textColor, bgColor, text) => {
  if (text.length === 7) {
    return chalk.bold.hex(textColor).bgHex(bgColor)(right(`${text}  `, 12));
  }
  return chalk.bold.hex(textColor).bgHex(bgColor)(center(text, 12));
};

const formatTeam = (team, league) => {
  const useAbbreviatedName = team.name.length >= 21 || league === 'lcs-academy';
  const teamName = useAbbreviatedName ? team.abbreviatedName : team.name;
  const bgColor = team.hasOwnProperty('color') ? team.color : '#a0a0a0';
  return chalk.bold.whiteBright.bgHex(bgColor)(` ${teamName} `);
};

const getMatch = (league, match) => {
  const { team1, team2 } = match;
  const scoreStr = `${team1.score}  vs  ${team2.score}`;
  let statusText = formatStatus('#5a5a5a', '#fff', scoreStr);

  let team1Str = formatTeam(team1, league);
  let team2Str = formatTeam(team2, league);

  if (match.status === 'NOT STARTED') {
    statusText = formatStatus('#5a5a5a', '#fff', match.time);
  } else if (match.status === 'LIVE') {
    statusText = formatStatus('#fff', '#e50e47', 'LIVE');
  } else if (match.status === 'CONCLUDED') {
    team1Str = team1.score > team2.score ? chalk.underline(team1Str) : team1Str;
    team2Str = team1.score < team2.score ? chalk.underline(team2Str) : team2Str;
  }

  team1Str = right(team1Str, TEAM_WIDTH);
  team2Str = left(team2Str, TEAM_WIDTH);

  return `${team1Str + center(statusText, STATUS_WIDTH) + team2Str}\n`;
};

function getDate(match, currentDateHeader, i) {
  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);
  let dateStr = '';

  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (currentDateHeader !== match.date || i === 0) {
    if (today.toLocaleString('en-US', DATE) === match.date) {
      dateStr = `Today, ${today.toLocaleString('en-US', shortDate)}`;
    } else if (yesterday.toLocaleString('en-US', DATE) === match.date) {
      dateStr = `Yesterday, ${yesterday.toLocaleString('en-US', shortDate)}`;
    } else if (tomorrow.toLocaleString('en-US', DATE) === match.date) {
      dateStr = `Tomorrow, ${tomorrow.toLocaleString('en-US', shortDate)}`;
    } else {
      dateStr = match.date;
    }
  }
  return dateStr;
}

function getDateSuffix(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function getMatchResult(match) {
  if (match.status !== 'CONCLUDED') {
    return '';
  }
  if (match.team1.score > match.team2.score) {
    return match.team1.name;
  }
  if (match.team1.score < match.team2.score) {
    return match.team2.name;
  }
}

module.exports = {
  matches(league) {
    const spinner = ora('Loading matches').start();
    const url = `http://lolesports.s3-accelerate.amazonaws.com/${league}/schedule`;

    fetch(url)
      .catch(() => {
        console.error('\nHost is inaccessible -- are you offline?');
        process.exit(1);
      })
      .then(res => res.json())
      .then(json => {
        const { schedule } = json;
        spinner.stop();
        if (schedule.length > 0) {
          console.log(`\n${center(league.toUpperCase(), TABLE_WIDTH)}\n`);
          let currentDateHeader = new Date(schedule[0].matchID).toLocaleString(
            'en-US',
            DATE
          );

          for (let i = 0; i < schedule.length; i += 1) {
            const matchStartDate = schedule[i].matchID;
            const match = {
              status: schedule[i].status,
              date: new Date(matchStartDate).toLocaleString('en-US', DATE),
              day: new Date(matchStartDate).toLocaleString('en-US', NUM_DAY),
              weekday: new Date(matchStartDate).toLocaleString('en-US', DAY),
              time: new Date(matchStartDate).toLocaleString('en-US', TIME),
              team1: schedule[i].team1,
              team2: schedule[i].team2,
            };
            const dateTitle = getDate(match, currentDateHeader, i);

            if (dateTitle !== '') {
              console.log(
                `${chalk.hex('#fff').bgHex('#1e1e1e')(
                  center(dateTitle, TABLE_WIDTH)
                )}\n`
              );
            }

            currentDateHeader = match.date;
            console.log(getMatch(league, match));
          }
        } else {
          console.log(
            `\n  There are no ${league.toUpperCase()} matches this week.\n`
          );
        }
      });
  },
  getDate,
  getDateSuffix,
  getMatchResult,
};
