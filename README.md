<p align="center">
<a href="https://www.npmjs.com/package/leagueoflegends" target="_blank" rel="noopener">
  <img src="https://user-images.githubusercontent.com/22821657/90683501-a1443500-e234-11ea-93fc-f12f2b658911.png" alt="League of Legends Command-Line Interface" width="400px">
</a>
</p>

<p align=center>
<a target="_blank" href="https://travis-ci.com/LukeAlSaba/leagueoflegends" title="Build Status"><img src="https://travis-ci.com/LukeAlSaba/leagueoflegends.svg?branch=master"></a>
<a target="_blank" href="https://snyk.io/test/github/LukeAlSaba/leagueoflegends?targetFile=package.json"><img src="https://snyk.io/test/github/LukeAlSaba/leagueoflegends/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/LukeAlSaba/leagueoflegends?targetFile=package.json" style="max-width:100%;"></a>
<a target="_blank" href="https://npmjs.org/package/leagueoflegends" title="NPM version"><img src="https://img.shields.io/npm/v/leagueoflegends.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://packagephobia.com/result?p=leagueoflegends" title="Install Size"><img src="https://packagephobia.com/badge?p=leagueoflegends@3.4.2"></a>
<a target="_blank" href="https://github.com/prettier/prettier" title="Install Size"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
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
<img width="598" alt="leagueoflegends matches (example)" src="https://user-images.githubusercontent.com/22821657/91642948-55944700-e9fd-11ea-8533-83135a145eb0.png">
</a>

## Standings

<p>
Get the current standings for any of the 5 premier LoL leagues.
</p>

```
$ leagueoflegends standings --lcs
```
<a href="https://www.npmjs.com/package/leagueoflegends" target="_blank" rel="noopener">
<img width="430" alt="leagueoflegends standings (example)" src="https://user-images.githubusercontent.com/70277327/91379947-c5ce7d00-e7f1-11ea-909a-260b7e195761.png">
</a>

### Inspired by:

  - [nba-go](https://github.com/xxhomey19/nba-go)
  
  
