<script lang="ts">

  import { confetti } from "@neoconfetti/svelte";
  // https://svelte.dev/repl/4e41a080739a4427a1f2c98b7f5d4b24?version=4.2.1

	import { tick } from 'svelte'
	
	let isVisible = false;
</script>

  <a href="/type">Type</a>
<button on:click={async () => {
	isVisible = false;
	await tick();
	isVisible = true;
}}>
	Show confetti
</button>

{#if isVisible}
<div>
	<div use:confetti />
</div>
{/if}

<style>
	:global(body) {
		overflow: hidden;
	}
	
	div {
		display: flex;
		justify-content: center;
	}
</style>

