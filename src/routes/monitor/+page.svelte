<script lang="ts">
	import { monitorData } from '../../stores/dbStores';
	import DiscrepancyDetails from './components/DiscrepancyDetails.svelte';
	import { deleteDiscrepancies, markDiscrepanciesAsReported } from '$lib/db';
	import type { Discrepancy } from '$lib/db_interfaces';
	import { addTatColumn, formatDateFields } from '$lib/utils';
	import { isLgScreen } from '../../stores/mediaStores';
	let editionOn = false;

	let selected: Array<number> = [];
	function handleSelection(event: any) {
		const id = Number.parseInt(event.target.value, 10) ;
		const isSelected = event.target.checked;

		if (isSelected) {
			selected.push(id);
		} else {
			selected.splice(selected.indexOf(id), 1);
		}
		selected = selected;
	}

	async function deleteSelected() {
		await deleteDiscrepancies(selected);
		selected = [];
	}

	let discrepacyForDetail: Discrepancy | undefined;

	let downloadLink: HTMLAnchorElement;

	let loadingReport = false;

	let displayData: Discrepancy[] | undefined;

	$: displayData = $monitorData?.sort((a, b) => a.id! - b.id!);

	async function downloadReport() {
		const downloadFileName = 'DISCREPANCY_REPORT_RECONEXT_RNMX_';
		
		loadingReport = true;
		let rows: any = $monitorData?.filter((row) => row.id && selected.includes(row.id));

		formatDateFields(rows);

		// add only report columns
		
		if (rows) {
			addTatColumn(rows)
			rows.forEach((row: Discrepancy) => {
				row.storage_location = row.id
			})
		}


		const headers = [
			'service_center',
			'rma_creation_date',
			'dock_receipt_datetime',
			'discrepancy_confirmation_datetime',
			'confirmation_tat',
			'tracking_number',
			'rma_number',
			'discrepancy_category',
			'expected_sku',
			'expected_sn',
			'received_sku',
			'received_sn',
			'storage_location',
			'qty',
			'channel',
			'entity'
		];

		let csv = [headers.toString()];

		rows?.forEach((row: { [x: string]: any }) => {
			const values = headers.map((header) => row[header] ?? '');
			csv.push(values.toString());
		});

		const formated = csv.join('\n');

		const blob = new Blob([formated], { type: 'text/csv' });

		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = downloadFileName;
		loadingReport = false;
		downloadLink.click();

		checkboxForm.reset();

		await markDiscrepanciesAsReported(selected)

		selected = [];
	}

	let checkboxForm: HTMLFormElement;
</script>


<form bind:this={checkboxForm}>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">ID</th>
				<th class="detail-row" scope="col">Channel</th>
				{#if $isLgScreen}
					<th scope="col">Entity</th>
				{/if}
				<th scope="col">Confirmation date</th>
				<th scope="col">Category</th>
				{#if $isLgScreen}
					<th scope="col">RMA</th>
					<th scope="col">Quantity</th>
				{/if}
			</tr>
		</thead>
		<tbody class="table-group-divider">
			{#if displayData}
				{#each displayData as row (row.id)}
					<tr>
						<th scope="row">
							<div class="form-check">
								<input
									on:change={handleSelection}
									class="form-check-input"
									type="checkbox"
									value={row.id}
									id="rowCheck"
								/>
								<label class="form-check-label" for="rowCheck">
									{row.id}
								</label>
							</div>
						</th>
						<td>{row.channel}</td>
						{#if $isLgScreen}
							<td>{row.entity}</td>
						{/if}
						<td
							>{row.discrepancy_confirmation_datetime
								? new Date(row.discrepancy_confirmation_datetime).toLocaleDateString()
								: null}</td
						>
						<td>{row.discrepancy_category}</td>
						{#if $isLgScreen}
							<td>{row.rma_number}</td>
							<td>{row.qty}</td>
						{/if}

						<td
							><button
								on:click={() => (discrepacyForDetail = row)}
								type="button"
								class="btn btn-primary btn-sm"
								data-bs-toggle="modal"
								data-bs-target="#detailsId"
							>
								Details
							</button></td
						>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</form>

{#if selected.length > 0}
	<div class="container text-center">
		<p>{selected.length} row{selected.length > 1 ? 's' : ''} selected</p>
		<button type="button" class="btn btn-danger pr-3" on:click={deleteSelected}>Delete</button>
		<button on:click={downloadReport} type="button" class="btn btn-success"
			>{loadingReport ? 'Creating report...' : 'Build report with selected'}</button
		>
	</div>
{/if}


<!-- Modal Body -->
<!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
<div
	class="modal fade"
	id="detailsId"
	tabindex="-1"
	role="dialog"
	aria-labelledby="discrepancyTitleId"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="discrepancyTitleId">Discrepancy data</h5>
				<button
					type="button"
					on:click={() => (editionOn = false)}
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
				/>
			</div>
			<div class="modal-body">
				<DiscrepancyDetails bind:editionOn discrepancy={discrepacyForDetail} />
			</div>
			<div class="modal-footer">
				<button on:click={() => (editionOn = !editionOn)} type="button" class="btn btn-secondary">
					{editionOn ? 'Read mode' : 'Edition mode'}
				</button>

				<button
					type="button"
					on:click={() => (editionOn = false)}
					class="btn btn-primary"
					data-bs-dismiss="modal">Ok</button
				>
			</div>
		</div>
	</div>
</div>

<a bind:this={downloadLink} hidden href="/">Download</a>
