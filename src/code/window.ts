export type WindowSize = { width: number, height: number }

export function currentWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}
