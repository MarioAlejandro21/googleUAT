<script lang="ts">
	import type { PageData } from './$types';
	import { monitorData } from '../../stores/dbStores';

	export let data: PageData;
</script>

<table class="table">
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">Channel</th>
			<th scope="col">Date</th>
			<th scope="col">Category</th>
		</tr>
	</thead>
	<tbody>
		{#if $monitorData}
			{#each $monitorData as { id, channel, discrepancy_confirmation_datetime, discrepancy_category }}
				<tr>
					<th scope="row">{id}</th>
					<td>{channel}</td>
					<td>{discrepancy_confirmation_datetime}</td>
					<td>{discrepancy_category}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>
