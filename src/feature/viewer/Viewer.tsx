import { useEffect, useState } from "react";
import { MarkdownScreen } from "./Viewer/MarkdownScreen";
import { parse } from 'yaml';
import { Layout } from "../..//Layout";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileOpen = window.electron.fileOpen;

export function Viewer() {
    const [markdown, setMarkdown] = useState<{ [key: string]: string }>({})
    useEffect(() => {
        fileOpen().then((file: { canceled: boolean, data: string }) => {
            if (file.canceled) return
            setMarkdown(parse(file.data[0]))
        })
    }, [])
    return <><Layout><MarkdownScreen markdown={markdown} /></Layout></>
}

