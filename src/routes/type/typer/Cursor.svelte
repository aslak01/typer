<script lang="ts">
  export let shouldBlink: boolean;
</script>

{#if shouldBlink}
  <span class="blinking"></span>
{:else}
  <span></span>
{/if}

<style>
  @property --_opacity {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }
  span {
    --_color: color-mix(in srgb, var(--yellow-4), transparent var(--_opacity));
    position: absolute;
    left: -0.3ch;
    top: 0;
    height: 1rlh;
    width: 0.18ch;
    background: var(--yellow-4);
    animation-play-state: "paused";
  }
  span.blinking {
    animation: blink-animation 1s infinite linear;
    background: var(--_color);
  }
  @keyframes blink-animation {
    to {
      --_opacity: 0%;
    }
  }
</style>
