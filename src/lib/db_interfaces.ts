export interface Discrepancy {
    id?: number,
    created_at?: string,
    discrepancy_category?: string;
    discrepancy_confirmation_datetime?: string,
    channel?: string,
    entity?: string,
    created_by?: string,
    rma_creation_date?: string,
    dock_receipt_datetime?: string,
    tracking_number?: string,
    rma_number?: string,
    expected_sku?: string,
    received_sku?: string,
    received_sn?: string,
    qty?: number,
    authorized_by?: string
    assigned_disposition?: string,
    confirmation_tat?: number,
    reported_date?: string,
    storage_location?: number
}
