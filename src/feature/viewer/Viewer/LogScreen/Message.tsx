import { Container } from "@mui/material";

export function Message({ time, message, isSelected }: { time: string, message: string, isSelected: boolean }) {
    return <Container sx={{ color: isSelected ? '#fff' : null, backgroundColor: isSelected ? 'text.secondary' : null }}>{`(${time}) ${message}`}</Container>
}
