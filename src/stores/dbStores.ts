import { writable, type Writable } from "svelte/store";


export const monitorData: Writable<ArrayLike<any>| null> = writable()