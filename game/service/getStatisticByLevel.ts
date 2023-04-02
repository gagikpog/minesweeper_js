import { API_ROOT } from "../constants";
import { GameLevels, IServiceResult, IStatisticsItem, ServiceStatus } from "../types";

export function getStatisticByLevel(level: GameLevels): Promise<IStatisticsItem[]> {
    const basePath = 'api/getTop.php';
    let path = `${API_ROOT}${basePath}`;

    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ level })
    }).then((data) => data.json()).then((result: IServiceResult<IStatisticsItem[]>) => {
        if (result?.status === ServiceStatus.Error) {
            console.error(result.message);
        }
        return result.data;
    }).catch((error: Error) => {
        console.error(error);
        return [];
    });
}
