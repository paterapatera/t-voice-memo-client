import { Paper } from "@mui/material";
import Markdown from 'markdown-to-jsx'

export function Sentence({ children, onClick }: { children: string, onClick: () => void }) {
    // eslint-disable-next-line no-useless-escape
    return <Paper onClick={onClick}><Markdown>{children.replace(/^[\p{L}<>'"][^\n]*\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|$)/gmu, function (text: string) {
        console.log(text)
        return text.trim() + "  \n"
    }).replace(/^( *(\d+\. {1,4}|[*+-])[^\n]*)\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|$)/gmu, function (text: string) {
        console.log(text)
        return text.trim() + "\n\n"
    })}</Markdown></Paper>
}
