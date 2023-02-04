import { updateMonitorData } from "$lib/db"
import { supabase } from "$lib/supabaseClient"
import { onDestroy } from "svelte"

export function initRealtimeHooks() {

    const discrepancies = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'discrepancies' },
            async () => {
                await updateMonitorData()
            }
        )
        .subscribe()


    onDestroy(() => discrepancies.unsubscribe())
}