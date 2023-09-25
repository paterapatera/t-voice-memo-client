// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fileOpen: (dirPath?: string) => Promise<{ canceled: false, data: string, dirPath: string }> = window.electron.fileOpen;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fileSave: (text: string) => Promise<void> = window.electron.fileSave;
