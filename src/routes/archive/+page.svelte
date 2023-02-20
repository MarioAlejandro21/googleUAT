<script lang="ts">
	import { unmarkDiscrepanciesAsReported } from '$lib/db';
	import { archiveData } from '../../stores/dbStores';
	let form;

	let selected: Array<number> = [];
	function handleSelection(event: any) {
		const id = Number.parseInt(event.target.value,10);
		const isSelected = event.target.checked;

		if (isSelected) {
			selected.push(id);
		} else {
			selected.splice(selected.indexOf(id), 1);
		}
		selected = selected;
	}

	async function moveSelectedToMonitor() {
		await unmarkDiscrepanciesAsReported(selected)
		selected = []
	}

	
</script>

<h1>Discrepancies reported</h1>
<p>You can move the records to the monitor page for building the report again.</p>

<form bind:this={form}>
	<div class="table-responsive">
		<table class="table ">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Entity</th>
					<th scope="col">Channel</th>
					<th scope="col">Category</th>
					<th scope="col">Reported date</th>
				</tr>
			</thead>
			<tbody class="table-group-divider">
				{#if $archiveData}
					{#each $archiveData as row (row.id)}
						<tr class="">
							<td>
								<input
									on:change={handleSelection}
									class="form-check-input"
									type="checkbox"
									value={row.id}
									id="rowCheck"
								/>
								{row.id}</td
							>
							<td>{row.entity}</td>
							<td>{row.channel}</td>
							<td>{row.discrepancy_category}</td>
							<td>{row.reported_date ? new Date(row.reported_date).toLocaleDateString() : null}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</form>

{#if selected.length > 0}
	<div class="container text-center">
		<p>{selected.length} row{selected.length > 1 ? 's' : ''} selected</p>
		<button type="button" class="btn btn-primary pr-3" on:click={moveSelectedToMonitor} >Move to monitor</button>
	</div>
{/if}
