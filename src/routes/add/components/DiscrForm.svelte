<script lang="ts">
	import { addDiscrepancy } from '../../../lib/db';

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

	let discrepancy_category: string;
	let rma_creation_date: string;
	let dock_receipt_datetime: string;
	let discrepancy_confirmation_datetime: string;
	let tracking_number: string;
	let rma_number: string;
	let expected_sku: string;
	let received_sku: string;
	let received_sn: string;
	let qty: number;
	let channel: string;
	let entity: string;

	let loading = false;

	let form: HTMLFormElement;

	async function handleSubmit() {
		const rowData = {
			discrepancy_category,
			rma_creation_date,
			dock_receipt_datetime,
			discrepancy_confirmation_datetime,
			tracking_number,
			rma_number,
			expected_sku,
			received_sku,
			received_sn,
			qty,
			channel,
			entity
		};

		loading = true;

		const { newRecord: record, error } = await addDiscrepancy(rowData);

		loading = false;

		if (!error) {
			alert(`Success! 🎉 Discrepancy id: ${record.id}`);
		} else {
			alert(`Adding issue 😲: ${error.message}`);
		}

		form.reset();
	}
</script>

<div class="card">
	<div class="card-body">
		<h4 class="card-title">Discrepancy Form</h4>
		<form bind:this={form} on:submit|preventDefault={handleSubmit}>
			<div class="mb-3">
				<label for="confirmationDateInput" class="form-label">Confirmation date</label>
				<input
					type="datetime-local"
					required
					bind:value={discrepancy_confirmation_datetime}
					class="form-control"
					name="confirmationDateInput"
					id="confirmationDateInput"
					aria-describedby="confirmationDate"
				/>
				<small id="confirmationDate" class="form-text text-muted"
					>When the discrepancy was detected</small
				>
			</div>
			<div class="mb-3">
				<label for="qtyInput" class="form-label">Quantity</label>
				<input
					type="number"
					required
					bind:value={qty}
					class="form-control"
					name="qtyInput"
					id="qtyInput"
					aria-describedby="helpQty"
				/>
				<small id="helpQty" class="form-text text-muted">How many units</small>
			</div>

			<div class="mb-3">
				<label for="type" class="form-label">Discrepancy type</label>
				<select
					bind:value={discrepancy_category}
					required
					class="form-select form-select-lg"
					name="type"
					id="type"
				>
					<option value={''} selected>Select one</option>
					{#each discrepancyCategories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>
			{#if discrepancy_category}
				{#if discrepancy_category !== 'MISSING_LABELS'}
					<div class="mb-3">
						<label for="channelInput" class="form-label">Channel</label>
						<select
							bind:value={channel}
							class="form-select form-select-sm"
							name="channelInput"
							id="channelInput"
						>
							<option value={''} selected>Select channel</option>
							{#each channels as channel}
								<option value={channel}>{channel}</option>
							{/each}
						</select>
					</div>
					<div class="mb-3">
						<label for="entityInput" class="form-label">Entity</label>

						<select
							bind:value={entity}
							class="form-select form-select-sm"
							name="entityInput"
							id="entityInput"
						>
							<option value={''} selected>Select entity</option>
							{#each entities as entity}
								<option value={entity}>{entity}</option>
							{/each}
						</select>
					</div>
				{/if}

				{#if !['MISSING_LABELS'].includes(discrepancy_category)}
					<div class="mb-3">
						<label for="rmaInput" class="form-label">RMA</label>
						<input
							bind:value={rma_number}
							type="text"
							class="form-control"
							name="rmaInput"
							id="rmaInput"
						/>
					</div>
				{/if}
				{#if !['MISSING_LABELS', 'NO_RMA_SYSTEM'].includes(discrepancy_category)}
					<div class="mb-3">
						<label for="rmaCreationDate" class="form-label">RMA creation date</label>
						<input
							bind:value={rma_creation_date}
							type="date"
							class="form-control"
							name="rmaCreationDate"
							id="rmaCreationDate"
							aria-describedby="helpId"
							placeholder="YYYY-MM-DD"
						/>
						<small id="helpId" class="form-text text-muted">Can be referenced from PRS</small>
					</div>
				{/if}

				<div class="mb-3">
					<label for="dockReceiptInput" class="form-label">Dock receipt</label>
					<input
						type="datetime-local"
						bind:value={dock_receipt_datetime}
						class="form-control"
						name="dockReceiptInput"
						id="dockReceiptInput"
						aria-describedby="dockReceipt"
					/>
					<small id="dockReceipt" class="form-text text-muted"
						>When the material was received in Mexicali</small
					>
				</div>
				{#if discrepancy_category !== 'MISSING_LABELS'}
					<div class="mb-3">
						<label for="trackingInput" class="form-label">Tracking number</label>
						<input
							type="text"
							bind:value={tracking_number}
							class="form-control"
							name="trackingInput"
							id="trackingInput"
							aria-describedby="trackingHelp"
						/>
					</div>
				{/if}

				<div class="row mb-3">
					{#if !['RTC', 'INCORRECT_ENTITY', 'NO_RMA_SYSTEM', 'MISSING_LABELS', 'NO_MATCHING_RMA'].includes(discrepancy_category)}
						<div class="col-6">
							<label for="expectedSKUInput" class="form-label">Expected SKU</label>
							<input
								type="text"
								bind:value={expected_sku}
								class="form-control"
								name="expectedSKUInput"
								id="expectedSKUInput"
							/>
						</div>
					{/if}
					{#if ['RTC', 'INCORRECT_SKU', 'UNAUTHORIZED_CLOSEDBOX', 'INCORRECT_ENTITY'].includes(discrepancy_category)}
						<div class="col-6">
							<label for="receivedSKUInput" class="form-label">Received SKU</label>
							<input
								type="text"
								bind:value={received_sku}
								class="form-control"
								name="receivedSKUInput"
								id="receivedSKUInput"
							/>
						</div>
					{/if}
				</div>
				{#if ['RTC', 'UNAUTHORIZED_CLOSEDBOX', 'INCORRECT_ENTITY'].includes(discrepancy_category)}
					<div class="mb-3">
						<label for="receivedSNInput" class="form-label">Received serial number</label>
						<input
							type="text"
							bind:value={received_sn}
							class="form-control"
							name="receivedSNInput"
							id="receivedSNInput"
						/>
					</div>
				{/if}

				<div class="d-grid gap-2">
					<button
						type="submit"
						name="submitButton"
						id="submitButton"
						class="btn btn-primary"
						disabled={loading}
					>
						{#if loading}
							<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							Adding discrepancy...
						{:else}
							<i class="bi bi-magic" />
							Save discrepancy
						{/if}</button
					>
				</div>
			{/if}
		</form>
	</div>
</div>
