<script lang="ts">
	import type { PageData } from '../$types';
	import DiscrForm from './components/DiscrForm.svelte';

	export let data: PageData;
</script>

<h1>Adding form</h1>
<p>Here you can register a new discrepancy using a friendly user interface.</p>
<p>A id number will be given once you register a discrepancy.</p>

<div class="row row-cols-1 justify-content-center align-items-center g-2 py-3">
	<div class="col-md-8 col-lg-6">
		{#if data.session}
		<DiscrForm />
		{:else}
			<p>This form can only be used by authenticated users 👮</p>
			<p>Please <a href="/login">log in</a></p>
		{/if}
	</div>
</div>
