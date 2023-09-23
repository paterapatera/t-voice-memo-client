import { useEffect, useState } from "react";
import { parse } from 'yaml';
import { Message } from "./LogScreen/Message";
import { Stack } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileOpen = window.electron.fileOpen;

type OpenFileResultType = { canceled: boolean, data: string, dirPath: string }
type LogType = { [key: string]: { type: 'audio' | 'message', text: string } }
export function LogScreen() {
    const [log, setLog] = useState<LogType>({})
    const [, setDirPath] = useState<string>('')
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null
        fileOpen().then((file: OpenFileResultType) => {
            if (file.canceled) return
            setDirPath(file.dirPath)
            setLog(parse(file.data))
            return `${file.dirPath}/log.yaml`
        }).then((filePath: string) => {
            intervalId = setInterval(() => {
                fileOpen(filePath).then((file: OpenFileResultType) => {
                    if (file.canceled) return
                    setDirPath(file.dirPath)
                    setLog(parse(file.data))
                })
            }, 3000);
        })

        return () => {
            if (intervalId)
                clearInterval(intervalId);
        };
    }, [])
    return <Stack spacing={2}>
        {[...Object.entries(log)]
            .filter(([, { type }]) => type === 'message')
            .sort(([i1], [i2]) => Number(i2) - Number(i1))
            .map(([i, { text }]) => {
                return <Message {...{ time: i, message: text }} key={`message-${i}`} />
            })}
    </Stack>
}

