export function debounce<T = unknown[]>(func: (args: T) => void, time: number): (args: T) => void {
    let index: NodeJS.Timeout;
    return (...args) => {
        if (index) {
            clearTimeout(index);
        }
        index = setTimeout(() => {
            index = 0 as unknown as NodeJS.Timeout;
            func(...args)
        }, time);
    }
}
