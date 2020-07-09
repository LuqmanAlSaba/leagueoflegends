<p align=center>
# League of Legends Esports CLI
<a target="_blank" href="https://travis-ci.com/LukeAlSaba/OWLeague" title="Build Status"><img src="https://travis-ci.com/LukeAlSaba/OWLeague.svg?branch=master"></a>
<a target="_blank" href="https://npmjs.org/package/leagueoflegends" title="NPM version"><img src="https://img.shields.io/npm/v/owleague.svg"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>

<p>
Check out current <a href="https://watch.lolesports.com/" target="_blank" rel="noopener">LoL Esports</a> standings and the current weeks matches all in your console!

This CLI tool is for those who are both LoL fans and Software Engineers.

All data comes from the <a href="https://watch.lolesports.com/" target="_blank" rel="noopener">LoL Esports</a> website.
</p>

## Install

<p>
In order to use the League of Legends CLI, make sure that you have Node version 6.0.0 or higher.
</p>

```
$ npm install -g leagueoflegends
```

## Usage

`leagueoflegends` provides two main commands. 

  - [`matches` or `m`](#game)
  - [`standings` or `s`](#game)
  
#### Options

  - LoL Championship Series (LCS)  
    - `--lcs` or `-n`
  - LoL European Championship (LEC)
    - `--lec` or `-e`
  - LoL Champions Korea (LCK)
    - `--lck` or `-k`
  - Tencent LoL Pro League (LPL)
    - `--lpl` or `-p`
  - LoL Championship Series Academy (LCS Academy)
    - `--lcsacademy` or `-a`

### Matches

<p>
Get a list of this weeks matches for any of the 5 premier LoL leagues.
</p>

```
$ leagueoflegends matches --lcs
```

## Standings

<p>
Get the current standings for any of the 5 premier LoL leagues.
</p>

```
$ leagueoflegends standings --lcs
```

### Inspired by:

  - [nba-go](https://github.com/xxhomey19/nba-go)
  
  
