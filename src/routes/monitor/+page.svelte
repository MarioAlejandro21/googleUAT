<script lang="ts">
	import { monitorData } from '../../stores/dbStores';
	import DiscrepancyDetails from './components/DiscrepancyDetails.svelte';
	import { deleteDiscrepancies } from '$lib/db';
	import type { Discrepancy } from '$lib/db_interfaces';

	let editionOn = false;

	function formatDate(date: string) {
		const d = new Date(date);
		return d.toLocaleDateString();
	}

	let selected: Array<string> = [];
	function handleSelection(event: any) {
		const id = event.target.value;
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

	let downloadLink: HTMLAnchorElement

	let loadingReport = false

	async function downloadReport() {
		loadingReport = true
		const rows: any = $monitorData?.filter(row => row.id && selected.includes(row.id.toString(10)))
		const headers = [
			'service_center',
			'rma_creation_date',
			'dock_receipt_datetime',
			'discrepancy_confirmation_datetime',
			'tracking_number',
			'rma_number',
			'discrepancy_category',
			'expected_sku',
			'expected_sn',
			'received_sku',
			'received_sn',
			'qty',
			'channel',
			'entity',
		]

		let csv = [headers.toString()]

		rows?.forEach((row: { [x: string]: any; }) => {
			const values = headers.map(header => row[header] ?? "")
			csv.push(values.toString())
		})

		const formated = csv.join('\n')

		const blob = new Blob([formated], {type: 'text/csv'})

		downloadLink.href = URL.createObjectURL(blob)

		loadingReport = false

		downloadLink.click()
	}

</script>

{#if selected.length > 0}
	<div class="p-3">
		<p>{selected.length} row{selected.length > 1 ? 's' : ''} selected</p>
		<button type="button" class="btn btn-danger pr-3" on:click={deleteSelected}>Delete</button>
		<button on:click={downloadReport} type="button" class="btn btn-success">{loadingReport ? "Creating report...": "Build report with selected"}</button>
	</div>
{/if}

<table class="table">
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">Channel</th>
			<th scope="col">Confirmation date</th>
			<th scope="col">Category</th>
		</tr>
	</thead>
	<tbody class="table-group-divider">
		{#if $monitorData}
			{#each $monitorData as row (row.id)}
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
					<td>{formatDate(row.discrepancy_confirmation_datetime ?? '')}</td>
					<td>{row.discrepancy_category}</td>
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
