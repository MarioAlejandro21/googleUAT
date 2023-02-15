import { supabase } from "../lib/supabaseClient";
import { user } from "../stores/authStores";
import type { Discrepancy } from "./db_interfaces";



export async function getMonitorRecords(): Promise<Discrepancy[] | null> {
    const { data, error } = await supabase.from('discrepancies')
        .select('*')
        .is('reported_date', null)

    if (error) {
        throw new Error(`Issue getting monitor data ${error.message}`)
    }

    return data
}
export async function getArchiveRecords(): Promise<Discrepancy[] | null> {
    const { data, error } = await supabase.from('discrepancies')
        .select('*')
        .not('reported_date','is', null)

    if (error) {
        throw new Error(`Issue getting monitor data ${error.message}`)
    }

    return data
}

export async function markDiscrepanciesAsReported(ids: number[]) {
    const date = new Date(Date.now())

    console.log(ids)

    const { error } = await supabase.from('discrepancies')
    .update({reported_date: date})
    .in('id', ids)

    if (error) {
        throw new Error(`Issue recording report date ${error.message}`)
    }
}


export async function unmarkDiscrepanciesAsReported(ids: number[]) {

    const { error } = await supabase.from('discrepancies')
    .update({reported_date: null})
    .in('id', ids)

    if (error) {
        throw new Error(`Issue deleting report date ${error.message}`)
    }
}



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

