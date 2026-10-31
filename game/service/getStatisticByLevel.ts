import { API_ROOT } from "../constants";
import { GameLevels, ILeaderboardItem, IServiceResult, IStatisticsItem, ServiceStatus } from "../types";

export function getStatisticByLevel(level: GameLevels): Promise<IStatisticsItem[]> {
    const path = API_ROOT + 'getTop.php';

    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: JSON.stringify({
            game: 'minesweeper',
            mode: level,
            order: 'ASC',
            // Preserve the old API behavior: return all players, not just the default top 10.
            limit: 2147483647
        })
    }).then((response) => {
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
