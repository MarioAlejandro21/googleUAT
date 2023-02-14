<script lang="ts">
	import type { Discrepancy } from '$lib/db_interfaces';
	import { supabase } from '$lib/supabaseClient';

	const discrepancyCategories = [
		'DUMMY_FAKE',
		'EMPTY_PACKAGE',
		'INCORRECT_ENTITY',
		'INCORRECT_IMEI',
		'INCORRECT_SN',
		'INCORRECT_SKU',
		'MISSING_LABELS',
		'NO_MATCHING_RMA',
		'NO_RMA_SYSTEM',
		'NON_FITBIT',
		'NON_SCANNABLE',
		'RTC',
		'UNAUTHORIZED_CLOSEDBOX'
	];

	const channels = ['B2B', 'B2C'];

	const entities = ['GOOGLE', 'FITBIT'];

	export let discrepancy: Discrepancy | undefined;

	let loading = false;

	async function handleSubmit(event: any) {
		loading = true;
		const formData = new FormData(event.target);

		const fields = [
			'discrepancy_category',
			'dock_receipt_datetime',
			'discrepancy_confirmation_datetime',
			'channel',
			'entity',
			'rma_number',
			'rma_creation_date',
			'tracking_number',
			'expected_sku',
			'received_sku',
			'received_sn',
			'qty'
		];

		let submitDiscrepancy: any = {};

		fields.forEach((field) => {
			const value = formData.get(field)?.toString();
			if (value) {
				submitDiscrepancy[field] = value;
			}
		});

		if (!discrepancy) {
			throw Error('Cannot update empty discrepancy');
		}

		const { error } = await supabase
			.from('discrepancies')
			.update(submitDiscrepancy)
			.eq('id', discrepancy.id);

		loading = false;

		if (!error) {
			alert('Updated discrepancy in the db 🎉');
		} else {
			alert(`Issue updating discrepancy: ${error.message}`);
		}
	}

	export let editionOn = false;

</script>

{#if discrepancy}
	<div class="table-responsive-md">
		<form on:submit|preventDefault={handleSubmit}>
			<table class="table ">
				<tbody>
					<tr class="">
						<td>id</td>
						<td>{discrepancy.id}</td>
					</tr>

					<tr class="">
						<td>Category</td>
						{#if editionOn}
							<td>
								<select
									value={discrepancy.discrepancy_category}
									class="form-select form-select-sm"
									name="discrepancy_category"
									id="discrepancyCategory"
								>
									{#each discrepancyCategories as category}
										<option value={category}>{category}</option>
									{/each}
								</select>
							</td>
						{:else}
							<td>{discrepancy.discrepancy_category}</td>
						{/if}
					</tr>

					<tr class="">
						<td>Dock receipt date</td>
						{#if editionOn}
							<td>
								<input
									type="datetime-local"
									value={discrepancy.dock_receipt_datetime}
									class="form-control"
									name="dock_receipt_datetime"
									id="dockReceiptDateInput"
								/>
							</td>
						{:else}
							<td
								>{discrepancy.dock_receipt_datetime
									? new Date(discrepancy.dock_receipt_datetime).toLocaleDateString()
									: null}</td
							>
						{/if}
					</tr>

					<tr class="">
						<td>Confirmation date</td>
						{#if editionOn}
							<input
								type="datetime-local"
								name="discrepancy_confirmation_datetime"
								class="form-control"
								value={discrepancy.discrepancy_confirmation_datetime}
							/>
						{:else}
							<td
								>{discrepancy.discrepancy_confirmation_datetime
									? new Date(discrepancy.discrepancy_confirmation_datetime).toLocaleDateString()
									: null}</td
							>
						{/if}
					</tr>

					<tr class="">
						<td>Channel</td>
						{#if editionOn}
							<td>
								<select
									value={discrepancy.channel}
									class="form-select form-select-sm"
									name="channel"
									id="channel"
								>
									{#each channels as channel}
										<option value={channel}>{channel}</option>
									{/each}
								</select>
							</td>
						{:else}
							<td>{discrepancy.channel}</td>
						{/if}
					</tr>

					<tr class="">
						<td>Entity</td>
						{#if editionOn}
							<td>
								<select
									value={discrepancy.entity}
									class="form-select form-select-sm"
									name="entity"
									id="entity"
								>
									{#each entities as entity}
										<option value={entity}>{entity}</option>
									{/each}
								</select>
							</td>
						{:else}
							<td>{discrepancy.entity}</td>
						{/if}
					</tr>

					<tr class="">
						<td>RMA</td>
						{#if editionOn}
							<input
								type="text"
								autocomplete="off"
								class="form-control"
								name="rma_number"
								value={discrepancy.rma_number}
							/>
						{:else}
							<td>{discrepancy.rma_number}</td>
						{/if}
					</tr>

					<tr class="">
						<td>RMA creation date</td>
						{#if editionOn}
							<input
								type="date"
								name="rma_creation_date"
								class="form-control"
								value={discrepancy.rma_creation_date}
							/>
						{:else}
							<td>{discrepancy.rma_creation_date}</td>
						{/if}
					</tr>

					<tr class="">
						<td>Tracking</td>
						{#if editionOn}
							<input
								type="text"
								autocomplete="off"
								class="form-control"
								name="tracking_number"
								value={discrepancy.tracking_number}
							/>
						{:else}
							<td>{discrepancy.tracking_number}</td>
						{/if}
					</tr>

					<tr class="">
						<td>Expected SKU</td>
						{#if editionOn}
							<input
								type="text"
								autocomplete="off"
								class="form-control"
								name="expected_sku"
								value={discrepancy.expected_sku}
							/>
						{:else}
							<td>{discrepancy.expected_sku}</td>
						{/if}
					</tr>

					<tr class="">
						<td>Received SKU</td>
						{#if editionOn}
							<input
								type="text"
								autocomplete="off"
								class="form-control"
								name="received_sku"
								value={discrepancy.received_sku}
							/>
						{:else}
							<td>{discrepancy.received_sku}</td>
						{/if}
					</tr>

					<tr>
						<td>Received SN</td>
						{#if editionOn}
							<input
								type="text"
								autocomplete="off"
								class="form-control"
								name="received_sn"
								value={discrepancy.received_sn}
							/>
						{:else}
							<td>{discrepancy.received_sn}</td>
						{/if}
					</tr>
					<tr>
						<td>Quantity</td>
						{#if editionOn}
							<input
								type="number"
								autocomplete="off"
								class="form-control"
								name="qty"
								value={discrepancy.qty}
							/>
						{:else}
							<td>{discrepancy.qty}</td>
						{/if}
					</tr>
				</tbody>
			</table>
			{#if editionOn}
				<button type="submit" class="btn btn-primary" disabled={loading}><i class="bi bi-save" /> {loading ? "Updating..." : "Save changes"}</button>
			{/if}
		</form>
	</div>
{/if}
