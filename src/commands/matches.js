const chalk = require("chalk");
const ora = require("ora");
const {left, right, center} = require("wide-align");
const fetch = require('node-fetch');

const DATE = {weekday: "long", month: "long", day: "numeric"};
const NUM_DAY = {day: "numeric"};
const DAY = {weekday: "long"};
const TIME = {hour: "2-digit", minute: "2-digit"};

const TEAM_WIDTH = 23;
const STATUS_WIDTH = 22;
const TABLE_WIDTH = TEAM_WIDTH + STATUS_WIDTH + TEAM_WIDTH;
chalk.hex("#eeeeee").bold.bgHex("#666666")
const getMatch = (league, match) => {
    let statusText = chalk.hex("#eeeeee").bold.bgHex("#666666").inverse(center(match.team1.score + "  vs  " + match.team2.score, 12));
    // let statusText = chalk.hex("#eeeeee").bold.bgHex("#666666").inverse("    " + result1 + " - " + result2 + "    ");
    let team1Name = ((match.team1.name).length >= 20 || league === "lcs-academy") ? match.team1.abbreviatedName : match.team1.name;
    let team2Name = ((match.team2.name).length >= 20 || league === "lcs-academy") ? match.team2.abbreviatedName : match.team2.name;
    let team1 = chalk.bgHex(match.team1.color).whiteBright.bold(center(team1Name, team1Name.length + 2));
    let team2 = chalk.bgHex(match.team2.color).whiteBright.bold(center(team2Name, team2Name.length + 2));

    if (match.status === "NOT STARTED") {
        statusText = chalk.hex("#eeeeee").bold.bgHex("#666666").inverse(`  ${right(match.time, 8)}  `);
    } else if (match.status === "LIVE") {
        statusText = chalk.hex("#fff")(chalk.bgHex("#e50e47").bold(center("LIVE"), 12));
    } else if (match.status === "CONCLUDED") {
        let star = chalk.hex("#ffd45a")(" ⭑ ");
        team1 = (match.team1.score > match.team2.score) ? star + team1 : team1;
        team2 = (match.team1.score < match.team2.score) ? team2 + star : team2;
    }

    return `${right(team1, TEAM_WIDTH) + center(statusText, STATUS_WIDTH) + left(team2, TEAM_WIDTH)}\n`;
};

function getDateSuffix(d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function getDate(match, currentDate, i) {
    let today = new Date();
    let yesterday = new Date(today);
    let tomorrow = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today = today.toLocaleString("en-US", DATE);
    yesterday = yesterday.toLocaleString("en-US", DATE);
    tomorrow = tomorrow.toLocaleString("en-US", DATE);
    let dateStr = "";

    if (today === match.date) {
        dateStr = "Today";
    } else if (yesterday === match.date) {
        dateStr = "Yesterday";
    } else if (tomorrow === match.date) {
        dateStr = "Tomorrow";
    } else if (currentDate !== match.date || i === 0) {
        dateStr = match.date + getDateSuffix(match.day);
    }
    return dateStr;
}

function getMatchResult(match) {
    if (match.status !== "CONCLUDED") {
        return "";
    } else if (match.team1.score > match.team2.score) {
        return match.team1.name;
    } else if (match.team1.score < match.team2.score) {
        return match.team2.name;
    }
}

module.exports = {
    matches(league) {
        const spinner = ora("Loading matches").start();
        const url = `https://lolesports.s3.us-east-2.amazonaws.com/${league}/schedule`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                const schedule = json.schedule;

                if (schedule.length > 0) {
                    spinner.stop();
                    console.log(`\n${center(league.toUpperCase(), TABLE_WIDTH)}\n`);

                    let currentDate = new Date(schedule[0].matchID).toLocaleString("en-US", DATE);
                    for (let i = 0; i < schedule.length; i += 1) {

                        const matchStartDate = schedule[i].matchID;

                        const match = {
                            status: schedule[i].status,
                            date: new Date(matchStartDate).toLocaleString("en-US", DATE),
                            day: new Date(matchStartDate).toLocaleString("en-US", NUM_DAY),
                            weekday: new Date(matchStartDate).toLocaleString("en-US", DAY),
                            time: new Date(matchStartDate).toLocaleString("en-US", TIME),
                            team1: schedule[i].team1,
                            team2: schedule[i].team2
                        };

                        let dateTitle = getDate(match, currentDate, i);

                        if (dateTitle !== "") {
                            console.log(
                                `${chalk.hex("#fff").bgHex("#1e1e1e")(center(dateTitle, TABLE_WIDTH))}\n`
                            );
                        }

                        currentDate = match.date;
                        console.log(getMatch(league, match));
                    }
                } else {
                    spinner.stop();
                    console.log("\n  There are no " + league.toUpperCase() + " matches this week.\n");
                }
            });
    },
    getDateSuffix,
    getMatchResult
};
