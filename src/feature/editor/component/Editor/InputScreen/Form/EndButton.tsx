import Button from '@mui/material/Button';

export function EndButton({ time }: { time: string }) {
    const isDisable = Number.isNaN(Number(time)) || Number(time) < 1
    return <Button type="submit" disabled={isDisable} variant="contained">END</Button>
}
