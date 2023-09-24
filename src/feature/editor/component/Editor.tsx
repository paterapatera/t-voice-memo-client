import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { parse } from 'yaml';
import { Layout } from "../../../Layout";
import { InputScreen } from "./Editor/InputScreen";
import { LogScreen } from "./Editor/LogScreen";
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileOpen = window.electron.fileOpen;
export type LogType = { [key: string]: { type: 'audio' | 'message', text: string } }
type OpenFileResultType = { canceled: boolean, data: string, dirPath: string }

export function Editor() {
    const [logs, setLogs] = useState<LogType>({})
    const [, setDirPath] = useState<string>('')

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null
        fileOpen().then((file: OpenFileResultType) => {
            if (file.canceled) return
            setDirPath(file.dirPath)
            setLogs(parse(file.data))
            return `${file.dirPath}/log.yaml`
        }).then((filePath: string) => {
            if (filePath == null) return
            intervalId = setInterval(() => {
                fileOpen(filePath).then((file: OpenFileResultType) => {
                    if (file.canceled) return
                    setDirPath(file.dirPath)
                    setLogs(parse(file.data))
                })
            }, 3000);
        })

        return () => {
            if (intervalId)
                clearInterval(intervalId);
        };
    }, [])
    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6}><InputScreen logs={logs} /></Grid>
            <Grid xs={6}><LogScreen logs={logs} /></Grid>
        </Grid>
    </Layout>
}

