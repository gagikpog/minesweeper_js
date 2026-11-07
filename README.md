# Minesweeper

## Demo
You can play minesweeper [here](https://minesweeper.gagikpog.ru)

## Leaderboard API

The game uses the shared LeadBoard API at `https://api.gagikpog.ru/leadboard/`.
The API address is configured in `game/constants.ts`.

- Results are saved through `POST scores` with `game: "minesweeper"`.
- Rankings are loaded through `GET scores?game=minesweeper&mode=...&order=ASC&limit=2147483647`.
- Difficulty is sent as `mode`: `beginner`, `intermediate`, or `advanced`.

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm run dev
```

You can view the development server at `localhost:3000`.

### Production build

```bash
npm run build
```
