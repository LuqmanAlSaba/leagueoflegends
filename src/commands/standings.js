const chalk = require('chalk');
const ora = require('ora');
const {left, center} = require('wide-align');
const fetch = require('node-fetch');

const TEAM_WIDTH = 36;
const TEAM_RANK_W = 8;
const RECORD_WIDTH = 11;

const getStandings = (team, record) => `${team} ${record}`;

function getDiffColor(diff) {
    if (diff > 0) {
        return '#28b455';
    } else if (diff < 0) {
        return '#cc4939';
    } else {
        return '#e2e2e2';
    }
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
                    console.log('');
                    console.log(
                        chalk.hex('#fff').bgHex('#1e1e1e')(`${center('TEAM', TEAM_WIDTH)} ${center('RECORD', RECORD_WIDTH)}`)
                    );
                    console.log('');
                    chalk.hex('#4290a2')
                    for (let i = 0; i < data.length; i += 1) {
                        const team = {
                            name: data[i].name,
                            color: data[i].color,
                            rank: data[i].ranking,
                            record: data[i].record,
                        };

                        console.log(
                            getStandings(
                                left(center(chalk.whiteBright.bold(team.rank), TEAM_RANK_W) + chalk.bgHex(team.color).whiteBright.bold(team.name), TEAM_WIDTH),
                                center(chalk.whiteBright(team.record), RECORD_WIDTH)
                            ) + '\n');
                    }
                } else {
                    spinner.stop();
                    console.log(`\n  There are no ${league} standings.\n`);
                }
            });
    },
    getDiffColor
};
