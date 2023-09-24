export function head<T>(list: T[]) {
    if (list.length === 0) return null
    return list[0]
}

export function last<T>(list: T[]) {
    if (list.length === 0) return null
    return list[list.length - 1]
}
