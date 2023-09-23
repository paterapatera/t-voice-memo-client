import Stack from '@mui/material/Stack';
import { Sentence } from "./MarkdownScreen/Sentence";

export function MarkdownScreen({ markdown }: { markdown: { [key: string]: string } }) {
    return <Stack spacing={2}>
        {markdown && [...Object.entries(markdown)].sort(([i1], [i2]) => Number(i1) - Number(i2)).map(([i, v]) => <Sentence key={`sentence-${i}`}>{v}</Sentence>)}
    </Stack>
}

