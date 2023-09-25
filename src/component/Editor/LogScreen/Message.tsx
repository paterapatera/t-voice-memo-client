import { Container } from "@mui/material";

export function Message({ time, message }: { time: string, message: string }) {
    return <Container>{`(${time}) ${message}`}</Container>
}
