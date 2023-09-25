import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Form } from "./Form";
import { Sentence } from "./Sentence";

export function InputScreen() {
    const [sentences, setSentences] = useState<{ [key: string]: string }>({});

    return <Stack spacing={2}>
        <Form {...{ sentences, setSentences }} />
        {[...Object.entries(sentences)]
            .sort(([i1], [i2]) => Number(i2) - Number(i1))
            .map(([i, v]) => <Sentence key={`sentence-${i}`}>{[i, v]}</Sentence>)}
    </Stack>
}

