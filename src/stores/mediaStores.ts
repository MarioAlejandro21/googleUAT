import { writable } from "svelte/store";



export const isLgScreen = writable(false, (set) => {
    const watcher = window.matchMedia("(min-width: 997px)")
    const el = (e: { matches: boolean; }) => {
        set(e.matches)
    }

    watcher.addEventListener('change', el)

    return () => { watcher.removeEventListener('change', el) }
})