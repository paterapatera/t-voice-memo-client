import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useCallback, useEffect, useRef, useState } from "react";
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
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: window.innerWidth, height: window.innerHeight })
    const [markdown, setMarkdown] = useState<{ [key: string]: string }>({})
    const [log, setLog] = useState<LogType>({})
    const [dirPath, setDirPath] = useState<string>('')
    const [clickTime, setClickTime] = useState<string>("")

    const scrollRef = useRef<HTMLDivElement>()
    const logRef = useRef<{ [key: string]: number }>({})
    const scrollTo = useCallback((time: string) => {
        scrollRef.current.scrollTop = logRef.current[time]
    }, [scrollRef])

    useEffect(() => {
        const onResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', onResize);

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

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [])

    useEffect(() => {
        scrollTo(clickTime)
    })

    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6} style={{ height: windowSize.height - 57 }} sx={{ overflow: 'auto' }}><MarkdownScreen markdown={markdown} setClickTime={setClickTime} /></Grid>
            <Grid ref={scrollRef} xs={6} style={{ height: windowSize.height - 57 }} sx={{ overflow: 'auto' }}>
                <LogScreen ref={logRef} log={log} dirPath={dirPath} clickTime={clickTime} />
            </Grid>
        </Grid>
    </Layout>
}

