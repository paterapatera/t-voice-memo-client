import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Layout } from "@/Layout";
import { InputScreen } from "./InputScreen";
import { LogScreen } from "./LogScreen";
import { useEffect } from 'react';

import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { dirPathAtom, logFileLoader, logMapAtom } from './EditorAtom';

export function Editor() {
    const setDirPath = useSetRecoilState(dirPathAtom)
    const setLogMap = useSetRecoilState(logMapAtom)
    const logFile = useRecoilValueLoadable(logFileLoader)
    const logFileRefresh = useRecoilRefresher_UNSTABLE(logFileLoader)

    useEffect(() => {
        let intervalId: NodeJS.Timeout
        if (!logFile.contents.canceled) {
            intervalId = setInterval(logFileRefresh, 3000)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        if (logFile.state === 'hasValue') {
            setLogMap(logFile.contents.logMap)
            setDirPath(logFile.contents.dirPath)
        }
    }, [logFile])
    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6}><InputScreen /></Grid>
            <Grid xs={6}><LogScreen /></Grid>
        </Grid>
    </Layout>
}

