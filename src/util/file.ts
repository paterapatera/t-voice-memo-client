// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fileOpen: FileOpen = window.electron.fileOpen;
export type FileOpen = (dirPath?: string) => Promise<{ canceled: false, data: string, dirPath: string }>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fileSave: FileSave = window.electron.fileSave;
export type FileSave = (text: string) => Promise<void>
