<script lang="ts">
	import type { PageData } from './$types';
	import { monitorData } from '../../stores/dbStores';
	import { map, of } from 'rxjs';
	import type { Discrepancy } from '$lib/db_interfaces';

	function formatDate(date: string) {
		const d = new Date(date);
		return d.toLocaleDateString();
	}

	let selected: Array<number> = [];
	function handleSelection(event: { target: { value: any; checked: any } }) {
		const id = event.target.value;
		const isSelected = event.target.checked;

		if (isSelected) {
			selected.push(id);
		} else {
			selected.splice(selected.indexOf(id), 1);
		}
		selected = selected;
	}

	let discrepacyForDetail: Discrepancy;

	export let data: PageData;
</script>

{#if selected.length > 0}
	<p>{selected.length} row{selected.length > 1 ? 's' : ''} selected</p>
{/if}

<table class="table">
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">Channel</th>
			<th scope="col">Date</th>
			<th scope="col">Category</th>
		</tr>
	</thead>
	<tbody class="table-group-divider">
		{#if $monitorData}
			{#each $monitorData as row}
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
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">Body</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save</button>
			</div>
		</div>
	</div>
</div>
