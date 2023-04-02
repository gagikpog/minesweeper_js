import { API_ROOT } from "../constants";
import { GameLevels, IServiceResult, IStatisticsItem, ServiceStatus } from "../types";

export function saveStatistics(level: GameLevels, data: IStatisticsItem): Promise<boolean> {

    const { time, name } = data;

    if (!time || !level) {
        return Promise.resolve(false);
    }

    const basePath = 'api/add.php'
    let path = API_ROOT + basePath;
    const body = { name, time, level };

    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then((data) => data.json()).then((result: IServiceResult<void>) => {
        if (result?.status === ServiceStatus.Error) {
            console.error(result.message);
        }
        return result?.status === ServiceStatus.Success;
    }).catch((error) => {
        console.error(error);
        return false;
    });
}
