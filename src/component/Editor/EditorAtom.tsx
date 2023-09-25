import { atom, selector } from 'recoil'
import { parse } from 'yaml';
import { fileOpen } from '@/code/file';


export const logMapAtom = atom<LogMap>({
    key: 'Editor/LogMap',
    default: {},
})

export const dirPathAtom = atom<string | null>({
    key: 'Editor/DirPath',
    default: null,
})

export const logFileLoader = selector({
    key: 'Editor/LogFileLoader',
    get: async ({ get }): Promise<{ canceled: Canceled, logMap: LogMap, dirPath: DirPath }> => {
        const dirPath = get(dirPathAtom)
        const filePath = dirPath ? `${dirPath}/log.yaml` : null
        const { canceled, data, dirPath: newDirPath }: OpenFileResult = await fileOpen(filePath)

        if (canceled) return { canceled, logMap: {}, dirPath: null }

        const logMap = parse(data)
        return { canceled, logMap, dirPath: newDirPath }
    },
});

export type Time = string

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
