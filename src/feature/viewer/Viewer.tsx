import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from "react";
import { parse } from 'yaml';
import { MarkdownScreen } from "./Viewer/MarkdownScreen";
import { Layout } from "../..//Layout";
import { LogScreen } from "./Viewer/LogScreen";
import { Box } from '@mui/material';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileOpen = window.electron.fileOpen;

type OpenFileResultType = { canceled: boolean, data: string, dirPath: string }
export type LogType = { [key: string]: { type: 'audio' | 'message', text: string } }
export function Viewer() {
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: window.innerWidth, height: window.innerHeight })
    const [markdown, setMarkdown] = useState<{ [key: string]: string }>({})
    const [log, setLog] = useState<LogType>({})
    const [dirPath, setDirPath] = useState<string>('')
    const [clickTime, setClickTime] = useState<string>("")
    useEffect(() => {
        const onResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', onResize);

        // debug
        // const debugFile = 'C:/Users/pater4/Desktop/memo.yaml'
        const debugFile: string | null = null
        fileOpen(debugFile).then((file: OpenFileResultType) => {
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

        return () => window.removeEventListener('resize', onResize);
    }, [])

    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6} style={{ height: windowSize.height - 57 }} sx={{ overflow: 'auto' }}><MarkdownScreen markdown={markdown} setClickTime={setClickTime} /></Grid>
            <Grid xs={6} style={{ height: windowSize.height - 57 }} sx={{ overflow: 'auto' }}><LogScreen log={log} dirPath={dirPath} clickTime={clickTime} /></Grid>
        </Grid>
    </Layout>
}

