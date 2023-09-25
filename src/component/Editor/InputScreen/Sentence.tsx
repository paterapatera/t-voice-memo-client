import { Paper } from "@mui/material";
import Markdown from 'markdown-to-jsx'

export function Sentence({ children: [key, sentence] }: { children: [string, string] }) {
    // eslint-disable-next-line no-useless-escape
    return <Paper>[{key}]<Markdown>{sentence.replace(/^( *(\d+\. {1,4}|[\w\<\'\">\-*+])[^\n]*)\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|$)/gm, function (text: string) {
        return text.trim() + "  \n"
    })}</Markdown></Paper>
}
