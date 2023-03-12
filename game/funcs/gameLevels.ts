import { GameLevels } from "../types";

export function getLevelSettings(level: GameLevels) {
    switch (level) {
        case GameLevels.Intermediate:
            return {
                totalMines: 40,
                width: 16,
                height: 16,
                level
            };
        case 'advanced':
            return {
                totalMines: 99,
                width: 30,
                height: 16,
                level
            };
        case GameLevels.Beginner:
        default:
            return {
                totalMines: 10,
                width: 10,
                height: 10,
                level
            };
    }
}
