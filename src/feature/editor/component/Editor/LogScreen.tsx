import { LogType } from "../Editor";
import { Message } from "./LogScreen/Message";
import { Stack } from "@mui/material";

export function LogScreen({ logs }: { logs: LogType }) {
    return <Stack spacing={2}>
        {[...Object.entries(logs)]
            .filter(([, { type }]) => type === 'message')
            .sort(([i1], [i2]) => Number(i2) - Number(i1))
            .map(([i, { text }]) => {
                return <Message {...{ time: i, message: text }} key={`message-${i}`} />
            })}
    </Stack>
}

