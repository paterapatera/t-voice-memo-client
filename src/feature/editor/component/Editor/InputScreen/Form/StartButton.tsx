import Button from '@mui/material/Button';
import dayjs from 'dayjs';

const getNow = () => dayjs().format('HHmmss')
export function StartButton({ setTime }: { setTime: (time: string) => void }) {
    return <Button
        variant="contained"
        onClick={() => setTime(getNow())}
    >START</Button>
}
