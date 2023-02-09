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

export async function editDiscrepancy(id: number, fieldData: Discrepancy) {

    const { error } = await supabase
        .from('discrepancies')
        .update(fieldData)
        .eq('id', id)

    if (error) {
        throw new Error(`Issue editing: ${error.message}`)
    }

}

export async function deleteDiscrepancy(id: number) {

    const { error } = await supabase
        .from('discrepancies')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(`Issue deleting: ${error.message}`)
    }

}
export async function deleteDiscrepancies(ids: Array<number>) {

    const { error } = await supabase
        .from('discrepancies')
        .delete()
        .in('id', ids)

    if (error) {
        throw new Error(`Issue deleting: ${error.message}`)
    }

}

