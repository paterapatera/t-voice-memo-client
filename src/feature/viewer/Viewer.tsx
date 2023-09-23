import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from "react";
import { parse } from 'yaml';
import { MarkdownScreen } from "./Viewer/MarkdownScreen";
import { Layout } from "../..//Layout";
import { LogScreen } from "./Viewer/LogScreen";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileOpen = window.electron.fileOpen;

type OpenFileResultType = { canceled: boolean, data: string, dirPath: string }
export type LogType = { [key: string]: { type: 'audio' | 'message', text: string } }
export function Viewer() {
    const [markdown, setMarkdown] = useState<{ [key: string]: string }>({})
    const [log, setLog] = useState<LogType>({})
    const [dirPath, setDirPath] = useState<string>('')
    useEffect(() => {
        fileOpen().then((file: OpenFileResultType) => {
            if (file.canceled) return
            setDirPath(file.dirPath)
            setMarkdown(parse(file.data))
            return file.dirPath
        }).then((dirPath: string | null) => {
            if (dirPath == null) return
            fileOpen(`${dirPath}/log.yaml`).then((file: OpenFileResultType) => {
                setLog(parse(file.data))
            })
        })
    }, [])

    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6}><MarkdownScreen markdown={markdown} /></Grid>
            <Grid xs={6}><LogScreen log={log} dirPath={dirPath} /></Grid>
        </Grid>
    </Layout>
}

