<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { PageData } from './$types';
	import { user } from '../../stores/authStores';

	export let data: PageData;
	let email: string;
	let loading = false;

	async function handleLogin() {
		loading = true;
		const { error } = await supabase.auth.signInWithOtp({
			email
		});

		loading = false;

		if (error) {
			alert(`Auth error: ${error.message}`);
		} else {
			alert('Email sent 🎉, please check your inbox');
		}
	}

	async function handleLogOut() {
		loading = true;
		const { error } = await supabase.auth.signOut();

		loading = false;

		if (error) {
			alert(`Auth error: ${error.message}`);
		}
	}
</script>

<div class="container-sm">
	<div class="row justify-content-center align-items-center g-2">
		<div class="col-12">
			{#if data.session}
				<h5>Already logged in as {data.session.user.email} 🎉</h5>
				<button class="btn btn-primary" on:click={handleLogOut}>Log out</button>
			{:else}
				<h5>Please log in to interact with the db 👮</h5>
				<form on:submit|preventDefault={handleLogin}>
					<div class="mb-3">
						<label for="magicInput" class="form-label">Email</label>
						<input
							bind:value={email}
							type="email"
							class="form-control"
							name="magicInput"
							id="magicInput"
							aria-describedby="emailHelpId"
							placeholder="abc@mail.com"
						/>
						<small id="emailHelpId" class="form-text text-muted"
							>We'll send you a confirmation email to authenticate</small
						>
					</div>
					<div class="d-grid gap-2">
						<button
							disabled={loading}
							type="submit"
							name="submitButton"
							id="submitButton"
							class="btn btn-primary"
						>
							{#if loading}
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
								Sending email...
							{:else}
								<i class="bi bi-magic" />
								Send a magic link to my email
							{/if}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>

