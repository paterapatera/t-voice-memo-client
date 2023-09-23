export function head<T>(list: T[]) {
    if (list.length === 0) return null
    return list[0]
}
