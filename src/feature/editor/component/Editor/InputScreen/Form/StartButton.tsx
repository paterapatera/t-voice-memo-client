import Button from '@mui/material/Button';
import { last } from '../../../../../../code/list';
import { LogType } from '../../../Editor';

export function StartButton({ setTime, logs }: {
    setTime: (time: string) => void,
    logs: LogType,
}) {
    return <Button
        variant="contained"
        onClick={() => setTime(last(Object.entries(logs))[0])}
    >START</Button>
}
