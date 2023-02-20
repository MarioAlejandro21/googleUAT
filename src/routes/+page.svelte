<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to Google UAT discrepancy manager</h1>

{#if data.session}
	<p>Hello {data.session.user.email}! you have an active session in this site.</p>
	<p>Reading and modifying data is allowed.</p>
{:else}
	<p>Hello stranger!</p>
	<p>Only reading from the database is allowed.</p>
{/if}

<h5>About this website</h5>

<p>
	This website is used to manage in a better smarter way the discrepancies from Fitbit - Google.
	For the moment the website is deployed as a private website in <a href="https://vercel.com"
		>Vercel</a
	>
	and it uses a private database service in <a href="http://supabase.com">Supabase</a>, but the goal
	is to use it wit a company account from Reconext
</p>

<h5>Features:</h5>
<ul>
	<li>A user friendly interface for adding a new discrepancy.</li>
	<li>Create persistent records of discrepancy data.</li>
	<li>Generate a csv report for Google servers digestion.</li>
	<li>All CRUD operations on the discrepancies</li>
</ul>

