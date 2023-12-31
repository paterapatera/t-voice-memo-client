import { atom, selector } from 'recoil'
import { parse } from 'yaml';
import { fileAtom } from '@/Context';

export const memoMapAtom = atom<MemoMap>({
    key: 'Viewer/MemoMap',
    default: {},
})

export const logMapAtom = atom<LogMap>({
    key: 'Viewer/LogMap',
    default: {},
})

export const dirPathAtom = atom<string | null>({
    key: 'Viewer/DirPath',
    default: null,
})

export const selectedTimeAtom = atom<string | null>({
    key: 'Viewer/SelectedTime',
    default: null,
})

export const memoFileLoader = selector({
    key: 'Viewer/MemoFileLoader',
    get: async ({ get }): Promise<{ memoMap: MemoMap, dirPath: DirPath }> => {
        const file = get(fileAtom)
        const { canceled, data, dirPath }: OpenFileResult = await file.open()

        if (canceled) return { memoMap: {}, dirPath: null }

        const memoMap = parse(data)
        return { memoMap, dirPath }
    },
});

export const logFileLoader = selector({
    key: 'Viewer/LogFileLoader',
    get: async ({ get }): Promise<{ logMap: LogMap }> => {
        const file = get(fileAtom)
        const { dirPath } = get(memoFileLoader)

        if (dirPath == null) return { logMap: {} }

        const { data }: OpenFileResult = await file.open(`${dirPath}/log.yaml`)

        const logMap = parse(data)
        return { logMap }
    },
});

export type Time = string
export type MemoMap = { [time: Time]: Memo }
export type Memo = string

export type LogMap = { [time: Time]: Log }
export type Log = { type: Type, text: Text }
export type Type = 'audio' | 'message'
export type Text = string

export type OpenFileResult = {
    canceled: Canceled,
    data: Data,
    dirPath: DirPath,
}
export type Canceled = boolean
export type Data = string
export type DirPath = string | null
