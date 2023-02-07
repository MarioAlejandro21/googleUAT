<script lang='ts'>
	

	export let id: number | undefined;
	export let discrepancy_confirmation_datetime: string | undefined;
	export let channel: string | undefined;
	export let entity: string | undefined;
	export let discrepancy_category: string | undefined;
	export let rma_number: string | undefined;
	export let rma_creation_date: string | undefined;
	export let dock_receipt_datetime: string | undefined;
	export let tracking_number: string | undefined;
	export let expected_sku: string | undefined;
	export let received_sku: string | undefined;
	export let received_sn: string | undefined;
</script>

<div class="table-responsive-md">
	<table class="table table-primary">
		<tbody>
			<tr class="">
				<td>id</td>
				<td>{id}</td>
			</tr>

			<tr class="">
				<td>Category</td>
				<td>{discrepancy_category}</td>
			</tr>

			<tr class="">
				<td>Dock receipt date</td>
				<td
					>{dock_receipt_datetime ? new Date(dock_receipt_datetime).toLocaleDateString() : null}</td
				>
			</tr>

			<tr class="">
				<td>Confirmation date</td>
				<td>{discrepancy_confirmation_datetime ? new Date(discrepancy_confirmation_datetime).toLocaleDateString() : null}</td>
			</tr>

			<tr class="">
				<td>Channel</td>
				<td>{channel}</td>
			</tr>

			<tr class="">
				<td>Entity</td>
				<td>{entity}</td>
			</tr>

			<tr class="">
				<td>RMA</td>
				<td>{rma_number}</td>
			</tr>

			<tr class="">
				<td>RMA creation date</td>
				<td>{rma_creation_date}</td>
			</tr>

			<tr class="">
				<td>Tracking</td>
				<td>{tracking_number}</td>
			</tr>

			<tr class="">
				<td>Expected SKU</td>
				<td>{expected_sku}</td>
			</tr>

			<tr class="">
				<td>Received SKU</td>
				<td>{received_sku}</td>
			</tr>

			<tr class="">
				<td>Received SN</td>
				<td>{received_sn}</td>
			</tr>
		</tbody>
	</table>
</div>
