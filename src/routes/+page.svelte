<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to Google UAT discrepancy manager</h1>

{#if data.session}
	<p>Hello {data.session.user.email}</p>
{/if}

<p>This page is used to register, delete and mark discrepancies for Fitbit receipt in Mexicali</p>

