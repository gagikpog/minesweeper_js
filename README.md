# Minesweeper

## Demo
You can play minesweeper [here](https://minesweeper.gagikpog.ru)

## Leaderboard API

The game uses the shared LeadBoard API at `https://gagikpog.ru/leadboard/`.
The API address is configured in `game/constants.ts`.

- Results are saved through `POST add.php` with `game: "minesweeper"`.
- Rankings are loaded through `POST getTop.php` with `order: "ASC"`.
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
// or static
npm run build-static
```
