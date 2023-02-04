<script lang="ts">
	import type { PageData } from '../$types';
	import DiscrForm from './components/DiscrForm.svelte';

	export let data: PageData;
</script>

<div class="row row-cols-1 justify-content-center align-items-center g-2 py-3">
	<div class="col-md-8 col-lg-6">
		{#if data.session}
			<DiscrForm />
		{:else}
			<p>This page is only for authenticated users 👮</p>
		{/if}
	</div>
</div>
