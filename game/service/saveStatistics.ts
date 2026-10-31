import { API_ROOT } from "../constants";
import { GameLevels, IServiceResult, IStatisticsItem, ServiceStatus } from "../types";

export function saveStatistics(level: GameLevels, data: IStatisticsItem): Promise<boolean> {

    const { time, name } = data;

    const score = Number(time);

    if (!name || !Number.isInteger(score) || score <= 0 || !level) {
        return Promise.resolve(false);
    }

    const path = API_ROOT + 'add.php';
    const body = {
        identifier: name,
        score,
        game: 'minesweeper',
        mode: level
    };

    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`LeadBoard HTTP ${response.status}`);
        }
        return response.json();
    }).then((result: IServiceResult<void>) => {
        if (result?.status === ServiceStatus.Error) {
            console.error(result.message);
        }
        return result?.status === ServiceStatus.Success;
    }).catch((error) => {
        console.error(error);
        return false;
    });
}
