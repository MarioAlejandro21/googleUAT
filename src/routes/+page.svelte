<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>

{#if data.session}
	<p>Hello {data.session.user.email}</p>
{/if}

