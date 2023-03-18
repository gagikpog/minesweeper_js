export function callCollect<T>(func: (args: T[]) => void, time: number): (args: T) => void {
    let index: NodeJS.Timeout;
    let calls: T[] = [];

    return (args: T) => {
        calls.push(args);
        if (!index) {
            index = setTimeout(() => {
                index = 0 as unknown as NodeJS.Timeout;
                func(calls);
                calls = [];
            }, time);
        }
    }
}
