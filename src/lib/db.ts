import { supabase } from "../lib/supabaseClient";
import { user } from "../stores/authStores";
import { monitorData } from "../stores/dbStores";
import type { Discrepancy } from "./db_interfaces";





export async function addDiscrepancy(rowData: Discrepancy) {

    user.subscribe(u => {
        if (u) {
            rowData.created_by = u.id
        }
    }
    )

    const { data, error } = await supabase
        .from('discrepancies')
        .insert(
            rowData
        )
        .select()

    return data ? {
        newRecord: data[0]
    } : {
        error
    }

}

export async function updateMonitorData() {
    const { data: discrepancies } = await supabase
        .from('discrepancies')
        .select('*')

    monitorData.set(discrepancies ?? [])
}