import { API_ROOT } from "../constants";
import { GameLevels, ILeaderboardItem, IServiceResult, IStatisticsItem, ServiceStatus } from "../types";

export function getStatisticByLevel(level: GameLevels): Promise<IStatisticsItem[]> {
    const query = new URLSearchParams({
        game: 'minesweeper',
        mode: level,
        order: 'ASC',
        // Return all players, preserving the existing game behavior.
        limit: '2147483647'
    });
    const path = `${API_ROOT}scores?${query}`;

    return fetch(path).then((response) => {
        if (!response.ok) {
            throw new Error(`LeadBoard HTTP ${response.status}`);
        }
        return response.json();
    }).then((result: IServiceResult<ILeaderboardItem[]>) => {
        if (result?.status !== ServiceStatus.Success || !Array.isArray(result.data)) {
            throw new Error(result?.message || 'Не удалось получить рейтинг.');
        }
        return result.data.map((item): IStatisticsItem => ({
            name: item.identifier,
            time: String(item.score),
            date: item.date
        }));
    }).catch((error: Error) => {
        console.error(error);
        return [];
    });
}
