<script lang="ts">
	import type { LayoutData } from './$types';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { user } from '../stores/authStores';
	import { initRealtimeHooks } from '../hooks/realtimeHooks';

	interface navInfo {
		href: string;
		displayName: string;
	}

	const navsInfo: navInfo[] = [
		{ href: '/monitor', displayName: 'Monitor' },
		{ href: '/login', displayName: 'Log in' },
		{ href: '/add', displayName: 'Add discrepancy' },
	];
	
	initRealtimeHooks();
	
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async () => {
			invalidate('supabase:auth');

			const {
				data: { session },
				error
			} = await supabase.auth.getSession();

			user.set(session ? session.user : undefined);


			if (error) {
				throw new Error('Issue updating user');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	export let data: LayoutData;
</script>

<nav class="navbar navbar-expand-md">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Google UAT</a>
		<button
			class="navbar-toggler d-lg-none"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#collapsibleNavId"
			aria-controls="collapsibleNavId"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="collapsibleNavId">
			<ul class="navbar-nav me-auto mt-2 mt-lg-0">
				{#each navsInfo as info}
					<li class="nav-item">
						<a class="nav-link" href={info.href}>{info.displayName}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<div class="container-sm">
	<slot />
</div>
