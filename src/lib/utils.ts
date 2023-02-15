import { isLgScreen } from "../stores/mediaStores"
import type { Discrepancy } from "./db_interfaces"

export function formatDateForCSVReport(date: string | undefined): string | undefined {

    if (!date) {
        return undefined
    }

    const d = new Date(date)

    if (!d) {
        return undefined
    }

    const years = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${years}-${month}-${day}`
}
export function formatDatetimeForCSVReport(date: string | undefined): string | undefined {

    if (!date) {
        return undefined
    }

    const d = new Date(date)

    if (!d) {
        return undefined
    }

    const years = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hours = d.getHours()
    const minutes = d.getMinutes()
    return `${years}-${month}-${day} ${hours}:${minutes}`
}

export function formatDateFields(rows: Discrepancy[] | undefined) {
    if (!rows) {
        return
    }

    rows.forEach(row => {

        row.rma_creation_date = formatDateForCSVReport(row.rma_creation_date)
        row.discrepancy_confirmation_datetime = formatDatetimeForCSVReport(row.discrepancy_confirmation_datetime)
        row.dock_receipt_datetime = formatDatetimeForCSVReport(row.dock_receipt_datetime)
    });

}

export function checkWindow() {

    const result = window.matchMedia('(min-width: 997px)').matches
    isLgScreen.set(result)
}

function getWorkingDays(startDate: Date, endDate: Date) {
    let result = 0;

    const currentDate = startDate;

    if (startDate > endDate) {
        return 0;
    }

    while (currentDate <= endDate) {

        const weekDay = currentDate.getDay();
        if (weekDay != 0 && weekDay != 6)
            result++;

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result - 1;
}

export function addTatColumn(discrepancies: Discrepancy[]) {
    discrepancies.forEach(row => {
        const { discrepancy_confirmation_datetime, dock_receipt_datetime } = row

        if (discrepancy_confirmation_datetime && dock_receipt_datetime) {
            const startDate = new Date(dock_receipt_datetime)
            const endDate = new Date(discrepancy_confirmation_datetime)

            row.confirmation_tat = getWorkingDays(startDate, endDate)

        }

    });
}



