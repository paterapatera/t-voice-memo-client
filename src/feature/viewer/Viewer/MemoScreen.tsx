import { space } from '@/code/theme';
import Stack from '@mui/material/Stack';
import { Sentence } from "./MarkdownScreen/Sentence";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { windowSizeAtom } from '@/AppAtom';
import { memoMapAtom, selectedTimeAtom } from "../ViewerAtom";

export function MemoScreen() {
    const memoMap = useRecoilValue(memoMapAtom);
    const setSelectedTime = useSetRecoilState(selectedTimeAtom);
    const windowSize = useRecoilValue(windowSizeAtom)

    const scrollStyle = {
        style: { height: windowSize.height - space(9) },
        sx: { overflow: 'auto' }
    }

    return <Stack p={1} spacing={2} {...scrollStyle}>
        {Object.entries(memoMap)
            .sort(([i1], [i2]) => Number(i1) - Number(i2))
            .map(([i, v]) => <Sentence key={`sentence-${i}`} onClick={() => setSelectedTime(i)}>{v}</Sentence>)}
    </Stack>
}

