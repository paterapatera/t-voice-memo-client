import { useRef } from "react";
import { Stack } from "@mui/material";
import { space } from "@/util/theme";
import { Message } from "./Message";
import { Audio } from "./Audio";

import { useRecoilValue } from "recoil";
import { windowSizeAtom } from "@/AppAtom";
import {
    Time,
    dirPathAtom,
    logMapAtom,
    selectedTimeAtom
} from "../ViewerAtom";

export const LogScreen = () => {
    const logMap = useRecoilValue(logMapAtom);
    const dirPath = useRecoilValue(dirPathAtom);
    const selectedTime = useRecoilValue(selectedTimeAtom);
    const windowSize = useRecoilValue(windowSizeAtom)
    const stackRef = useRef<HTMLDivElement>(null)

    const scrollToIfSelected = (isSelected: boolean, messageElement: HTMLDivElement) => {
        if (!stackRef.current || !messageElement || !isSelected) return
        stackRef.current.scrollBy({ top: messageElement.getBoundingClientRect().top - space(2), behavior: 'smooth' })
    }

    const scrollStyle = {
        style: { height: windowSize.height - space(9) },
        sx: { overflow: 'auto' }
    }

    const isSelected = (time: Time) => selectedTime === time

    return <Stack ref={stackRef} p={1} spacing={2} {...scrollStyle}>
        {Object.entries(logMap)
            .sort(([i1], [i2]) => Number(i1) - Number(i2))
            .map(([time, { type, text }]) => {
                if (type === 'audio' && dirPath) {
                    return <Audio {...{ time, path: `${dirPath}/${text}` }} key={`audio-${time}`} />
                } else {
                    return <Message
                        ref={(r) => scrollToIfSelected(isSelected(time), r)}
                        {...{ time, message: text, isSelected: isSelected(time) }}
                        key={`message-${time}`}
                    />
                }
            })}
    </Stack>
}
