import Button from '@mui/material/Button';
import { last } from '@/code/list';

import { useRecoilValue } from 'recoil';
import { logMapAtom } from '../../EditorAtom';

export function StartButton({ setTime }: {
    setTime: (time: string) => void,
}) {
    const logMap = useRecoilValue(logMapAtom)

    return <Button
        variant="contained"
        onClick={() => setTime(last(Object.entries(logMap))[0])}
    >START</Button>
}
