const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const commands = [
    require('./commands/matches'),
    require('./commands/standings'),
];

program
    .command('matches')
    .alias('m')
    .usage('(options)')
    .option('-n, --lcs', 'Show this weeks LCS schedule')
    .option('-e, --lec', 'Show this weeks LEC schedule')
    .option('-k, --lck', 'Show this weeks LCK schedule')
    .option('-p, --lpl', 'Show this weeks LPL schedule')
    .option('-m, --lcsacademy', 'Show this weeks LCS-Academy schedule')
    .on('--help', () => {
        console.log('\n  See this weeks matches specific LoL league!\n');
        console.log('  Example:\n');
        console.log(
            `  ${chalk`{hex('#218ffe') leagueoflegends matches --lcs}   List all of this weeks LCS matches`}\n`
        );
        console.log(
            `  Visit the GitHub page for more detailed information: ${chalk`{hex('#218ffe') https://github.com/LukeAlSaba/LeagueofLegends}`}\n`
        );
    })
    .action(cmd => {
        commands[0].matches(cmd.lcs ? 'lcs' : cmd.lec ? 'lec' : cmd.lck ? 'lck' : cmd.lpl ? 'lpl' : cmd.lcsacademy ? 'lcs-academy' : console.log('\nError: Please choose a league, by using one of these options (--na | --eu | --lck | --lpl | lms).\n'))
    });

program
    .command('standings')
    .alias('s')
    .usage('(options)')
    .option('-n, --lcs', 'Show this weeks LCS standings')
    .option('-e, --lec', 'Show this weeks LEC standings')
    .option('-k, --lck', 'Show this weeks LCK standings')
    .option('-p, --lpl', 'Show this weeks LPL standings')
    .option('-la, --lcsacademy', 'Show this weeks LCS-Academy standings')
    .on('--help', () => {
        console.log('\n  See the current standings for a specific LoL league!\n');
        console.log('  Example:\n');
        console.log(
            `  ${chalk`{hex('#218ffe') leagueoflegends standings --lcs}   List the current LCS standings`}\n`
        );
        console.log(
            `  Visit the GitHub page for more detailed information: ${chalk`{hex('#218ffe') https://github.com/LukeAlSaba/leagueoflegends}`}\n`
        );
    })
    .action(cmd => {
        commands[1].standings(cmd.lcs ? 'lcs' : cmd.lec ? 'lec' : cmd.lck ? 'lck' : cmd.lpl ? 'lpl' : cmd.lcsacademy ? 'lcs-academy' : console.log('\nError: Please choose a league, by using one of these options (--na | --eu | --lck | --lpl | lms).\n'))
    });

program.on('--help', () => {
    console.log(
        `\n  Welcome to the ${chalk`{bold.hex('#f99e1a') League of Legends Esports} CLI`}!\n`
    );
    console.log(
        `  Check out this weeks matches for a specific LoL league by entering  ${chalk`{hex('#218ffe') leagueoflegends matches --league}`}`
    );
    console.log(
        `  See the current standings for a specific LoL league by entering  ${chalk`{hex('#218ffe') leagueoflegends standings --league}`}\n`
    );
    console.log(
        `  Visit the GitHub page for more detailed information: ${chalk`{hex('#218ffe') https://github.com/LukeAlSaba/LeagueofLegends}`}\n`
    );
});

program.command('*').action(command => {
    console.log(`\n  error: unknown command \`${command}'\n`);
    process.exit(1);
});

program.version(pkg.version, '-v, --version');

program.parse(process.argv);
