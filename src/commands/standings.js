const chalk = require('chalk');
const ora = require('ora');
const { left, center } = require('wide-align');
const fetch = require('node-fetch');

const TEAM_WIDTH = 21;
const TEAM_RANK_W = 8;
const TOTAL = TEAM_WIDTH + TEAM_RANK_W;
const RECORD_WIDTH = 14;

const getStandings = (team, record) => `${team} ${record}`;

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

        const data = json.standings;

        if (data.length > 0) {
          console.log("\n" + chalk.hex('#fff').bgHex('#1e1e1e')(
              `${left(center("", TEAM_RANK_W) + center("TEAM"), TOTAL)} ${center('RECORD', RECORD_WIDTH)}`
          ) + "\n");
          chalk.hex('#4290a2');
          for (let i = 0; i < data.length; i += 1) {
            const team = {
              name:
                data[i].name.length >= 20 || league === 'lcs-academy'
                  ? data[i].abbreviatedName
                  : data[i].name,
              color: data[i].color,
              rank: data[i].ranking,
              record: data[i].record,
            };

            console.log(
              `${getStandings(
                left(
                  center(chalk.bold(`${team.rank}`), TEAM_RANK_W) +
                    center(
                      chalk.bgHex(team.color).whiteBright.bold(` ${team.name} `)
                    ),
                  TOTAL
                ),
                center(chalk.bold(team.record), RECORD_WIDTH)
              )}\n`
            );
          }
        } else {
          spinner.stop();
          console.log(`\n  There are no ${league} standings.\n`);
        }
      });
  },
  getDiffColor,
};
