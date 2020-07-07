
# League of Legends Esports CLI

<p>
Check out the current weeks League of Legends matches from your console.  
Best CLI tool for those who are both LoL fans and Software Engineers.

All data comes from [PandaScore](https://pandascore.co/) APIs.
</p>

## Install

<p>
In order to use League of Legends CLI, make sure that you have [Node](https://nodejs.org/) version 6.0.0 or higher.
</p>

```
$ npm install -g leagueoflegends
```

## Usage

`leagueoflegends` provides one main command. 

  - `matches` or `m`

### Matches

<p>
Get a list of this weeks matches for any of the 5 premier League of Legends leagues.
</p>

#### Options

<p>
Currently you can view the current weeks matches for the 5 premier LoL leagues.
</p>

#### Leagues

  - North America LoL Championship Series (NA LCS)  
    - `--na` or `-n`
  - Europe LoL Championship Series (EU LCS)
    - `--eu` or `-e`
  - LoL Champions Korea (LCK)
    - `--lck` or `-k`
  - LoL Pro League (LPL)
    - `--lpl` or `-p`
  - LoL Masters Series (LMS)
    - `--lms` or `-m`

#### Example

```
$ leagueoflegends matches --na
```

### Inspired by:

  - [nba-go](https://github.com/xxhomey19/nba-go)
  
  
