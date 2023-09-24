import Stack from '@mui/material/Stack';
import { Sentence } from "./MarkdownScreen/Sentence";

export function MarkdownScreen({ markdown, setClickTime }: { markdown: { [key: string]: string }, setClickTime: (time: string) => void }) {
    return <Stack spacing={2}>
        {markdown && [...Object.entries(markdown)].sort(([i1], [i2]) => Number(i1) - Number(i2)).map(([i, v]) => <Sentence key={`sentence-${i}`} onClick={() => setClickTime(i)}>{v}</Sentence>)}
    </Stack>
}

