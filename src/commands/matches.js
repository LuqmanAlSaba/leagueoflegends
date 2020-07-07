const chalk = require("chalk");
const ora = require("ora");
const {left, right, center} = require("wide-align");
const fetch = require('node-fetch');

const DATE = {weekday: "long", month: "long", day: "numeric"};
const NUM_DAY = {day: "numeric"};
const DAY = {weekday: "long"};
const TIME = {hour: "2-digit", minute: "2-digit"};

const TEAM_WIDTH = 30;
const STATUS_WIDTH = 22;
const TABLE_WIDTH = TEAM_WIDTH + STATUS_WIDTH + TEAM_WIDTH;

const getMatch = (match, team1, team2, result1, result2, time, status) => {
    let statusText = result1 + chalk.hex("#e2e2e2")("   vs   ") + result2;
    if (status === "NOT STARTED") {
        statusText = chalk.hex("#eeeeee").bold.bgHex("#666666")(
            `  ${right(time, 8)}  `
        );
    } else if (status === "LIVE") {
        statusText = chalk.hex("#fff")(chalk.bgHex("#e50e47").bold("    LIVE    "));
    }
    let star = chalk.hex("#ffd45a")(" ⭑ ");
    if (match.team1.score > match.team2.score) {
        team1 = star + team1;
    } else if (match.team2.score > match.team1.score) {
        team2 = team2 + star;
    }
    return `${right(team1, TEAM_WIDTH) + center(statusText, STATUS_WIDTH) + left(team2, TEAM_WIDTH)}\n`;
};

function swap(array, i, j) {
    const newArray = array;
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
}

function bubbleSort(array) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length - 1; i += 1) {
            if (
                array[i].startDate !== undefined &&
                array[i + 1].startDate !== undefined &&
                array[i].startDate > array[i + 1].startDate
            ) {
                swap(array, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);
    return array;
}

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

function getMatchResult(score1, score2, status) {
    if (score1 > score2 && status !== "IN_PROGRESS") {
        return "Team 1";
    }
    if (score1 < score2 && status !== "IN_PROGRESS") {
        return "Team 2";
    }
    return "";
}

function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
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
                    console.log(
                        `\n${center(
                            chalk.hex("#fff")(league.toUpperCase()),
                            TABLE_WIDTH
                        )}\n`
                    );

                    let currentDate = new Date(schedule[0].matchID).toLocaleString("en-US", DATE);
                    let currentDay = new Date(schedule[0].matchID).toLocaleString("en-US", NUM_DAY);
                    const today = new Date().toLocaleString("en-US", DATE);
                    const date = currentDate + getDateSuffix(currentDay);
                    console.log(
                        `${chalk.hex("#fff").bgHex("#1e1e1e")(
                            `${center(date, TABLE_WIDTH)}`
                        )}\n`
                    );
                    for (let i = 0; i < schedule.length; i += 1) {

                        const matchStartDate = schedule[i].matchID;
                        // const match = schedule[i].matches[j];
                        // let date = new Date(parseInt(matchStartDate));
                        // let strTime = getTime(date)
                        // console.log(strTime);

                        const match = {
                            // result: getMatchResult(team1.score, team2.score, data[i].time),
                            status: schedule[i].status,
                            date: new Date(matchStartDate).toLocaleString("en-US", DATE),
                            day: new Date(matchStartDate).toLocaleString("en-US", NUM_DAY),
                            weekday: new Date(matchStartDate).toLocaleString("en-US", DAY),
                            time: new Date(matchStartDate).toLocaleString("en-US", TIME),
                            team1: schedule[i].team1,
                            team2: schedule[i].team2
                        };

                        if (match.date === today && currentDate != match.date) {
                            console.log(
                                `${chalk.hex("#fff").bgHex("#1e1e1e")(
                                    `${center("Today", TABLE_WIDTH)}`
                                )}\n`
                            );
                        } else if(currentDate != match.date){
                            const date = match.date + getDateSuffix(match.day);
                            console.log(
                                `${chalk.hex("#fff").bgHex("#1e1e1e")(
                                    `${center(date, TABLE_WIDTH)}`
                                )}\n`
                            );
                        }
                        currentDate = match.date;

                        console.log(
                            getMatch(
                                match,
                                chalk.bgHex(match.team1.color).whiteBright.bold(match.team1.name),
                                chalk.bgHex(match.team2.color).whiteBright.bold(match.team2.name),
                                chalk
                                    .hex(match.team1.score > match.team2.score ? "#fff" : "#a1a1a1")
                                    .bold(match.team1.score),
                                chalk
                                    .hex(match.team2.score > match.team1.score ? "#fff" : "#a1a1a1")
                                    .bold(match.team2.score),
                                match.time,
                                match.status
                            )
                        );

                        /*
                        if (match.weekday !== currentDay) {
                            const today = new Date().toLocaleString("en-US", DATE);
                            const currentDate = match.date;
                            currentDay = match.weekday;

                            if (currentDate === today) {
                                console.log(
                                    `${chalk.hex("#fff").bgHex("#1e1e1e")(
                                        `${center("Today", TABLE_WIDTH)}`
                                    )}\n`
                                );
                            } else {
                                const date = match.date + getDateSuffix(match.day);
                                console.log(
                                    `${chalk.hex("#fff").bgHex("#1e1e1e")(
                                        `${center(date, TABLE_WIDTH)}`
                                    )}\n`
                                );
                            }
                        }
                      */
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
