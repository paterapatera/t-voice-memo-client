import { useEffect } from "react";
import { parse } from 'yaml';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { Layout } from "@/Layout";
import { MemoScreen } from "./Viewer/MemoScreen";
import { LogScreen } from "./Viewer/LogScreen";

import { useSetRecoilState } from "recoil";
import { windowSizeAtom } from "@/AppAtom";
import {
    memoMapAtom,
    logMapAtom,
    dirPathAtom,
} from "./ViewerAtom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileOpen = window.electron.fileOpen;

type OpenFileResultType = { canceled: boolean, data: string, dirPath: string }
export type LogType = { [key: string]: { type: 'audio' | 'message', text: string } }
export function Viewer() {
    const setMemoMap = useSetRecoilState(memoMapAtom);
    const setLogMap = useSetRecoilState(logMapAtom);
    const setDirPath = useSetRecoilState(dirPathAtom);
    const setWindowSize = useSetRecoilState(windowSizeAtom)

    useEffect(() => {
        const onResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', onResize);

        fileOpen().then((file: OpenFileResultType) => {
            if (file.canceled) return
            setDirPath(file.dirPath)
            setMemoMap(parse(file.data))
            return file.dirPath
        }).then((dirPath: string | null) => {
            if (dirPath == null) return
            fileOpen(`${dirPath}/log.yaml`).then((file: OpenFileResultType) => {
                setLogMap(parse(file.data))
            })
        })

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [])

    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6}><MemoScreen /></Grid>
            <Grid xs={6}><LogScreen /></Grid>
        </Grid>
    </Layout>
}

