import type { Discrepancy } from "$lib/db_interfaces";
import { writable, type Writable } from "svelte/store";




export const monitorData: Writable<Array<Discrepancy> | undefined> = writable()

