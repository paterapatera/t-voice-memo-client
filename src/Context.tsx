import { atom } from 'recoil'
import { fileOpen, fileSave } from "./util/file";

export const fileAtom = atom({
  key: 'Context/File',
  default: {
    open: fileOpen,
    save: fileSave,
  },
})
