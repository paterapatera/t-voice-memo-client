import { atom } from 'recoil'
import { WindowSize, currentWindowSize } from '@/code/window'

export const windowSizeAtom = atom<WindowSize>({
    key: 'App/WindowSize',
    default: currentWindowSize(),
})
