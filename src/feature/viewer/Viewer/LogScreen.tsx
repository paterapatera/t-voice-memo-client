import { forwardRef } from "react";
import { Message } from "./LogScreen/Message";
import { Audio } from "./LogScreen/Audio";
import { Stack } from "@mui/material";
import { LogType } from "../Viewer";

export const LogScreen = forwardRef<{ [key: string]: number }, {
    log: LogType,
    dirPath: string,
    clickTime: string,
}>(({ log, dirPath, clickTime }, ref) => {
    return <Stack spacing={2}>
        {[...Object.entries(log)].sort(([i1], [i2]) => Number(i1) - Number(i2)).map(([time, { type, text }]) => {
            if (type === 'audio') {
                return <Audio {...{ time, path: `${dirPath}/${text}` }} key={`audio-${time}`} />
            } else {
                const isSelected = clickTime === time
                return <Message ref={(i) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (!i || !ref.current) return
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    ref.current[time] = i.getBoundingClientRect().top
                }} {...{ time, message: text, isSelected }} key={`message-${time}`} />
            }
        })}
    </Stack>
})

