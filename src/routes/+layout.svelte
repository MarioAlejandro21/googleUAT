<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { user } from '../stores/authStores';
	import { checkWindow } from '$lib/utils';
	interface navInfo {
		href: string;
		displayName: string;
	}


	const navsInfo: navInfo[] = [
		{ href: '/add', displayName: 'Add discrepancy' },
		{ href: '/monitor', displayName: 'Monitor' },
		{ href: '/archive', displayName: 'Archive' },
		{ href: '/login', displayName: 'Log in' },
	];

	onMount(() => {
		checkWindow();
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async () => {
			invalidate('supabase:auth');

			const {
				data: { session },
				error
			} = await supabase.auth.getSession();

			user.set(session ? session.user : null);

			if (error) {
				throw new Error('Issue updating user');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
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
	<footer>
		<p>Created by Mario Alejandro Valenzuela <i class="bi bi-c-circle"></i></p>
		<p>Contact info</p>
		<ul>
			<li>
				<i class="bi bi-envelope-at" />
				<a href="mailto:mariolejandro@live.com">mariolejandro@live.com</a>
			</li>
			<li><i class="bi bi-phone" /> 🇲🇽 <a href="tel:+526861470915">+52 686 147 0915 </a></li>
		</ul>
	</footer>
</div>


<style>
	footer {
		position:absolute;
		bottom: 0px;
		padding-bottom: 2rem;
	}
</style>

