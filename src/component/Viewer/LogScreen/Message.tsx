import { Container } from "@mui/material";
import { forwardRef } from "react";

export const Message = forwardRef<HTMLDivElement, { time: string, message: string, isSelected: boolean }>(({ time, message, isSelected }, ref) => {
    return <Container ref={ref} sx={{ color: isSelected ? '#fff' : null, backgroundColor: isSelected ? 'text.secondary' : null }}>{`(${time}) ${message}`}</Container>
})
