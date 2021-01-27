const program = require('commander');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const commands = [
  require('./commands/matches'),
  require('./commands/standings'),
];

const params = require('./params.json')
updateNotifier({ pkg }).notify();

function runCommand(commandIndex, cmd, execution) {
  // eslint-disable-next-line no-restricted-syntax
  for (const command of params) {
    const key = Object.keys(command)[0]
    const value = Object.values(command)[0]
    if (cmd[key]) {
      commands[commandIndex][execution](value)
      return true
    }
  }
  return false
}

// TODO: Add option to hide spoilers
program.name('leagueoflegends').usage('[command] [options]');

program
  .command('matches')
  .alias('m')
  .usage('[options]')
  .option('-w, --worlds', 'Show this weeks Worlds schedule')
  .option('-n, --lcs', 'Show this weeks LCS schedule')
  .option('-e, --lec', 'Show this weeks LEC schedule')
  .option('-k, --lck', 'Show this weeks LCK schedule')
  .option('-p, --lpl', 'Show this weeks LPL schedule')
  .option('-a, --lcsacademy', 'Show this weeks LCS-Academy schedule')
  .on('--help', () => {
    console.log('\n  See the current weeks LoL matches!\n');
    console.log('  Example:');
    console.log(
      `           ${chalk`{hex('#218ffe') leagueoflegends matches --lcs}   List all of this weeks LCS matches`}\n`
    );
    console.log(
      `  Visit the GitHub page for more detailed information: ${chalk`{hex('#218ffe') https://github.com/LukeAlSaba/LeagueofLegends}`}\n`
    );
  })
  .action(cmd => {
    if (runCommand(0, cmd, "matches"))
      return
    console.log(
      '\nError: Please choose a league, by using one of these options (--worlds | --lcs | --lec | --lck | --lpl | --lcsacademy).\n'
    );
  });

program
  .command('standings')
  .alias('s')
  .usage('[options]')
  .option('-w, --worlds', 'Show this weeks Worlds standings')
  .option('-n, --lcs', 'Show this weeks LCS standings')
  .option('-e, --lec', 'Show this weeks LEC standings')
  .option('-k, --lck', 'Show this weeks LCK standings')
  .option('-p, --lpl', 'Show this weeks LPL standings')
  .option('-a, --lcsacademy', 'Show this weeks LCS-Academy standings')
  .on('--help', () => {
    console.log('\n  See the current standings for a specific LoL league!\n');
    console.log('  Example:');
    console.log(
      `           ${chalk`{hex('#218ffe') leagueoflegends standings --lcs}   List the current LCS standings`}\n`
    );
    console.log(
      `  Visit the GitHub page for more detailed information: ${chalk`{hex('#218ffe') https://github.com/LukeAlSaba/leagueoflegends}`}\n`
    );
  })
  .action(cmd => {
    if (runCommand(1, cmd, "standings"))
      return
    console.log(
      '\nError: Please choose a league, by using one of these options (--worlds | --lcs | --lec | --lck | --lpl | --lcsacademy).\n'
    );
  });

program.on('--help', () => {
  console.log(
    `\n  Welcome to the ${chalk`{bold.hex('#f99e1a') League of Legends Esports} CLI`}!\n`
  );
  console.log(
    `  Check out this weeks schedule by entering  ${chalk`{hex('#218ffe') leagueoflegends matches --league_name}`}`
  );
  console.log(
    `  See the current standings by entering  ${chalk`{hex('#218ffe') leagueoflegends standings --league_name}`}\n`
  );
  console.log(
    `  Visit the GitHub page for more detailed information: ${chalk`{hex('#218ffe') https://github.com/LukeAlSaba/LeagueofLegends}`}\n`
  );
});

program.command('*').action((command) => {
  console.log(`\n  error: unknown command \`${command}'\n`);
  process.exit(1);
});

program.version(pkg.version, '-v, --version');

program.parse(process.argv);
