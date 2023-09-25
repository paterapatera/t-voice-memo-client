import { useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { Layout } from "@/Layout";
import { MemoScreen } from "./MemoScreen";
import { LogScreen } from "./LogScreen";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { windowSizeAtom } from "@/AppAtom";
import {
    memoMapAtom,
    logMapAtom,
    dirPathAtom,
    memoFileLoader,
    logFileLoader,
} from "./ViewerAtom";

export function Viewer() {
    const setMemoMap = useSetRecoilState(memoMapAtom);
    const setLogMap = useSetRecoilState(logMapAtom);
    const setDirPath = useSetRecoilState(dirPathAtom);
    const setWindowSize = useSetRecoilState(windowSizeAtom)
    const memoFile = useRecoilValue(memoFileLoader)
    const logFile = useRecoilValue(logFileLoader)

    const onResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        setDirPath(memoFile.dirPath)
        setMemoMap(memoFile.memoMap)
        setLogMap(logFile.logMap)

        window.addEventListener('resize', onResize);
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

