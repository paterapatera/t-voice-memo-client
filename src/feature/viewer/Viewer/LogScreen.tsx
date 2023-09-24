import { Message } from "./LogScreen/Message";
import { Audio } from "./LogScreen/Audio";
import { Stack } from "@mui/material";
import { LogType } from "../Viewer";

export function LogScreen({ log, dirPath, clickTime }: { log: LogType, dirPath: string, clickTime: string }) {
    return <Stack spacing={2}>
        {[...Object.entries(log)].sort(([i1], [i2]) => Number(i1) - Number(i2)).map(([time, { type, text }]) => {
            if (type === 'audio') {
                return <Audio {...{ time, path: `${dirPath}/${text}` }} key={`audio-${time}`} />
            } else {
                return <Message {...{ time, message: text }} isSelected={clickTime === time} key={`message-${time}`} />
            }
        })}
    </Stack>
}

