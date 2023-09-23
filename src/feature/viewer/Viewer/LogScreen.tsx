import { Message } from "./LogScreen/Message";
import { Audio } from "./LogScreen/Audio";
import { Stack } from "@mui/material";
import { LogType } from "../Viewer";

export function LogScreen({ log, dirPath }: { log: LogType, dirPath: string }) {
    return <Stack spacing={2}>
        {[...Object.entries(log)].sort(([i1], [i2]) => Number(i1) - Number(i2)).map(([i, { type, text }]) => {
            if (type === 'audio') {
                return <Audio {...{ time: i, path: `${dirPath}/${text}` }} key={`audio-${i}`} />
            } else {
                return <Message {...{ time: i, message: text }} key={`message-${i}`} />
            }
        })}
    </Stack>
}

