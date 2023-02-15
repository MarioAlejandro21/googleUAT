import { getArchiveRecords, getMonitorRecords } from "$lib/db";
import type { Discrepancy } from "$lib/db_interfaces";
import { supabase } from "$lib/supabaseClient";
import { writable, type Writable } from "svelte/store";




export async function updateMonitorData() {

    const data = await getMonitorRecords()

    monitorData.set(data)
}


export const monitorData: Writable<Array<Discrepancy> | null> = writable([], (set) => {

    const discrepancies = supabase.channel('monitor-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'discrepancies' },
            async () => {
                const data = await getMonitorRecords()
                set(data)

            }
        )
        .subscribe()

    return () => discrepancies.unsubscribe()
})

export async function updateArchiveData() {
    const data = await getArchiveRecords()

    archiveData.set(data)
}

export const archiveData: Writable<Array<Discrepancy> | null> = writable([], (set) => {

    const discrepancies = supabase.channel('archive-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'discrepancies' },
            async () => {
                const data = await getArchiveRecords()
                set(data)

            }
        )
        .subscribe()

    return () => discrepancies.unsubscribe()
})

