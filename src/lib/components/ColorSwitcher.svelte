<script lang="ts">
  import { browser } from "$app/environment";
  import { fade, scale } from "svelte/transition";

  import SunAndMoon from "$lib/components/icons/SunAndMoon.svelte";
  import { onMount } from "svelte";

  let nextTheme: string;
  let requestsDark: boolean;

  onMount(() => {});

  let htmlBody: Element | null;

  if (browser) {
    htmlBody = document?.firstElementChild;

    htmlBody?.setAttribute("data-theme", "auto");
    if (typeof htmlBody !== "undefined" && htmlBody !== null) {
      requestsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      requestsDark ? (nextTheme = "light") : (nextTheme = "dark");
    }
  }

  const swapTheme = () => {
    console.log("tried to swap theme");
    console.log(htmlBody);
    if (typeof htmlBody === "undefined" || htmlBody === null) return;

    htmlBody.setAttribute("data-theme", nextTheme);

    nextTheme === "dark" ? (nextTheme = "light") : (nextTheme = "dark");
  };
</script>

{#if nextTheme && browser}
  <div class="hoverzone">
    <SunAndMoon on:click={swapTheme} />
  </div>
{/if}

<style>
  .hoverzone {
    display: block;
    position: fixed;
    right: var(--space-sm);
    z-index: 10;
  }
  @media (--lg-n-above) {
    .hoverzone {
      top: var(--space-normal);
      bottom: unset;
    }
  }
  @media (--lg-n-below) {
    .hoverzone {
      top: unset;
      bottom: var(--space-sm);
    }
  }

  button {
    background: transparent;
  }
</style>
