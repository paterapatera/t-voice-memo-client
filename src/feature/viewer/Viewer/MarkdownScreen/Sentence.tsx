import { Paper } from "@mui/material";
import Markdown from 'markdown-to-jsx'

export function Sentence({ children }: { children: string }) {
    // eslint-disable-next-line no-useless-escape
    return <Paper><Markdown>{children.replace(/^( *(\d+\. {1,4}|[\w\<\'\">\-*+])[^\n]*)\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|$)/gm, function (text: string) {
        return text.trim() + "  \n"
    })}</Markdown></Paper>
}
