import { Container } from "@mui/material";

export function Audio({ time, path }: { time: string, path: string }) {
    return <Container>{`(${time})`}<audio controls src={path} /></Container>
}
