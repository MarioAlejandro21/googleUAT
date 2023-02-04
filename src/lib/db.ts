import { supabase } from "../lib/supabaseClient";
import { user } from "../stores/authStores";
import { monitorData } from "../stores/dbStores";

interface RowData {
    discrepancy_category?: string;
    rma_creation_date?: Date,
    dock_receipt_datetime?: Date,
    discrepancy_confirmation_datetime?: Date,
    tracking_number?: string,
    rma_number?: string,
    expected_sku?: string,
    received_sku?: string,
    received_sn?: string,
    qty?: number,
    channel?: string,
    entity?: string,
    created_by?: string,
}



export async function addDiscrepancy(rowData: RowData) {

    user.subscribe(u => rowData.created_by = u ? u.id : undefined)

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

    monitorData.set(discrepancies)
}