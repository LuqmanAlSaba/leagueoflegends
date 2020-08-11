<p align="center">
<a href="https://www.npmjs.com/package/owleague" target="_blank" rel="noopener">
  <img src="https://user-images.githubusercontent.com/22821657/89957167-bc93bc80-dc04-11ea-8497-153d6d1b95c4.png" alt="" width="350px">
</a>
</p>

<p align=center>
<a target="_blank" href="https://travis-ci.com/LukeAlSaba/OWLeague" title="Build Status"><img src="https://travis-ci.com/LukeAlSaba/OWLeague.svg?branch=master"></a>
<a target="_blank" href="https://npmjs.org/package/leagueoflegends" title="NPM version"><img src="https://img.shields.io/npm/v/leagueoflegends.svg"></a>
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

<a href="https://www.npmjs.com/package/leagueoflegends" target="_blank" rel="noopener">
  <img width="400" alt="leagueoflegends matches (example)" src="https://user-images.githubusercontent.com/22821657/87068872-3ab70a80-c1e4-11ea-909d-be0001ee2fbb.png">
</a>

## Standings

<p>
Get the current standings for any of the 5 premier LoL leagues.
</p>

```
$ leagueoflegends standings --lcs
```
<a href="https://www.npmjs.com/package/leagueoflegends" target="_blank" rel="noopener">
<img width="400" alt="leagueoflegends standings (example)" src="https://user-images.githubusercontent.com/22821657/87068901-49052680-c1e4-11ea-97fb-33a86dd71731.png">
</a>

### Inspired by:

  - [nba-go](https://github.com/xxhomey19/nba-go)
  
  
