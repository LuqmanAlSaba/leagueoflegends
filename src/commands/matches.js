const chalk = require('chalk');
const ora = require('ora');
const { left, right, center } = require('wide-align');
const fetch = require('node-fetch');

const DATE = { weekday: 'long', month: 'long', day: 'numeric' };
const shortDate = { month: 'long', day: 'numeric' };
const NUM_DAY = { day: 'numeric' };
const DAY = { weekday: 'long' };
const TIME = { hour: '2-digit', minute: '2-digit' };

const TEAM_WIDTH = 23;
const STATUS_WIDTH = 22;
const TABLE_WIDTH = TEAM_WIDTH + STATUS_WIDTH + TEAM_WIDTH;
chalk.hex('#eeeeee').bold.bgHex('#666666');
const getMatch = (league, match) => {
  let statusText = chalk
    .hex('#eeeeee')
    .bold.bgHex('#666666')
    .inverse(center(`${match.team1.score}  vs  ${match.team2.score}`, 12));
  // let statusText = chalk.hex("#eeeeee").bold.bgHex("#666666").inverse("    " + result1 + " - " + result2 + "    ");
  const team1Name =
    match.team1.name.length >= 20 || league === 'lcs-academy'
      ? match.team1.abbreviatedName
      : match.team1.name;
  const team2Name =
    match.team2.name.length >= 20 || league === 'lcs-academy'
      ? match.team2.abbreviatedName
      : match.team2.name;
  let team1 = chalk
    .bgHex(match.team1.color)
    .whiteBright.bold(center(team1Name, team1Name.length + 2));
  let team2 = chalk
    .bgHex(match.team2.color)
    .whiteBright.bold(center(team2Name, team2Name.length + 2));

  if (match.status === 'NOT STARTED') {
    statusText = chalk
      .hex('#eeeeee')
      .bold.bgHex('#666666')
      .inverse(`  ${right(match.time, 8)}  `);
  } else if (match.status === 'LIVE') {
    statusText = chalk.hex('#fff')(
      chalk.bgHex('#e50e47').bold(center('LIVE', 12))
    );
  } else if (match.status === 'CONCLUDED') {
    const star = chalk.hex('#ffd45a')(' ⭑ ');
    team1 = match.team1.score > match.team2.score ? star + team1 : team1;
    team2 = match.team1.score < match.team2.score ? team2 + star : team2;
  }

  return `${right(team1, TEAM_WIDTH) +
    center(statusText, STATUS_WIDTH) +
    left(team2, TEAM_WIDTH)}\n`;
};

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

function getDate(match, currentDate, i) {
  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let dateStr = '';

  if (currentDate !== match.date || i === 0) {
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
    const url = `https://lolesports.s3.us-east-2.amazonaws.com/${league}/schedule`;

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

          let currentDate = new Date(schedule[0].matchID).toLocaleString(
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

            const dateTitle = getDate(match, currentDate, i);

            if (dateTitle !== '') {
              console.log(
                `${chalk.hex('#fff').bgHex('#1e1e1e')(
                  center(dateTitle, TABLE_WIDTH)
                )}\n`
              );
            }

            currentDate = match.date;
            console.log(getMatch(league, match));
          }
        } else {
          console.log(
            `\n  There are no ${league.toUpperCase()} matches this week.\n`
          );
        }
      });
  },
  getDateSuffix,
  getMatchResult,
};
