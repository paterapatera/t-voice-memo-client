import { Message } from "./Message";
import { Stack } from "@mui/material";

import { useRecoilValue } from "recoil";
import { logMapAtom } from "../EditorAtom";

export function LogScreen() {
    const logMap = useRecoilValue(logMapAtom)
    return <Stack spacing={2}>
        {[...Object.entries(logMap)]
            .filter(([, { type }]) => type === 'message')
            .sort(([i1], [i2]) => Number(i2) - Number(i1))
            .map(([i, { text }]) => {
                return <Message {...{ time: i, message: text }} key={`message-${i}`} />
            })}
    </Stack>
}

