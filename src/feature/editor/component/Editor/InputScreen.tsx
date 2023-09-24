import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Form } from "./InputScreen/Form";
import { Sentence } from "./InputScreen/Sentence";
import { LogType } from '../Editor';

export function InputScreen({ logs }: { logs: LogType }) {
    const [sentences, setSentences] = useState<{ [key: string]: string }>({});

    return <Stack spacing={2}>
        <Form {...{ sentences, setSentences, logs }} />
        {[...Object.entries(sentences)]
            .sort(([i1], [i2]) => Number(i2) - Number(i1))
            .map(([i, v]) => <Sentence key={`sentence-${i}`}>{[i, v]}</Sentence>)}
    </Stack>
}

