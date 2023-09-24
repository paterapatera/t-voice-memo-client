import { atom } from 'recoil'

export const memoMapAtom = atom<MemoMap>({
    key: 'Viewer/MemoMap',
    default: {
    },
})

export const logMapAtom = atom<LogMap>({
    key: 'Viewer/LogMap',
    default: {
    },
})

export const dirPathAtom = atom<string | null>({
    key: Symbol('Viewer/DirPath').toString(),
    default: null,
})

export const selectedTimeAtom = atom<string | null>({
    key: Symbol('Viewer/SelectedTime').toString(),
    default: null,
})

export type Time = string
export type MemoMap = { [time: Time]: Memo }
export type Memo = string

export type LogMap = { [time: Time]: Log }
export type Log = { type: Type, text: Text }
export type Type = 'audio' | 'message'
export type Text = string
