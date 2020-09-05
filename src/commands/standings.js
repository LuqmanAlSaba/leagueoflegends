const chalk = require('chalk');
const ora = require('ora');
const { left, center } = require('wide-align');
const fetch = require('node-fetch');

const TEAM_WIDTH = 22;
const TEAM_RANK_W = 8;
const RECORD_WIDTH = 14;
const TOTAL_TEAM_WIDTH = TEAM_WIDTH + TEAM_RANK_W;
const TOTAL = TEAM_WIDTH + TEAM_RANK_W + RECORD_WIDTH;

const getStandings = team => {
  const teamRank = center(chalk.bold(`${team.rank}`), TEAM_RANK_W);
  const teamName = chalk.bold.whiteBright.bgHex(team.color)(` ${team.name} `);
  const teamStr = left(teamRank + teamName, TOTAL_TEAM_WIDTH);
  const recordStr = center(chalk.bold(team.record), RECORD_WIDTH);
  return `${teamStr}${recordStr}\n`;
};

const getStandingsHeader = () => {
  const team = left(center('', TEAM_RANK_W) + center('TEAM'), TOTAL_TEAM_WIDTH);
  const record = center('RECORD', RECORD_WIDTH);
  return chalk.hex('#fff').bgHex('#1e1e1e')(`\n${team}${record}\n`);
};

const getGroupHeader = (groups, i) =>
  `\n${chalk.hex('#fff').bgHex('#1e1e1e')(center(groups[i / 4], TOTAL))}\n`;

function getDiffColor(diff) {
  if (diff > 0) {
    return '#28b455';
  }
  if (diff < 0) {
    return '#cc4939';
  }
  return '#e2e2e2';
}

module.exports = {
  standings(league) {
    const spinner = ora('Loading standings').start();
    const url = `https://lolesports.s3.us-east-2.amazonaws.com/${league}/standings`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        spinner.stop();

        const { standings } = json;
        const groups = ['Group A', 'Group B', 'Group C', 'Group D'];
        const leagueIsWorlds = league === 'worlds';

        if (standings.length > 0) {
          if (!leagueIsWorlds) {
            console.log(getStandingsHeader());
          }

          for (let i = 0; i < standings.length; i += 1) {
            let team = standings[i];
            const abbrName = team.name.length >= 21 || league === 'lcs-academy';
            team = {
              name: abbrName ? team.abbreviatedName : team.name,
              color: team.hasOwnProperty('color') ? team.color : '#a0a0a0',
              rank: team.ranking,
              record: team.record,
            };

            if (leagueIsWorlds && i % 4 === 0) {
              console.log(getGroupHeader(groups, i));
            }

            console.log(getStandings(team));
          }
        } else {
          spinner.stop();
          console.log(`\n  There are no ${league} standings.\n`);
        }
      });
  },
  getDiffColor,
};
