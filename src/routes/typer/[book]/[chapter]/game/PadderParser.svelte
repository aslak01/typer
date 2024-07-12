<script lang="ts">
  let {
    text,
    fade = false,
    pos,
  }: { text: string; fade: boolean; pos: "bottom" | "top" } = $props();
  function parseTypeString(str: string): string[] {
    const firstSpace = str.indexOf(" ");
    const lastSpace = str.lastIndexOf(" ");
    const preSliced = str.slice(firstSpace, str.length);
    const postSliced = str.slice(0, lastSpace);
    const croppedStr = pos === "top" ? preSliced : postSliced;
    return croppedStr.replaceAll("→", "").split("↪");
  }
  let str = $derived(parseTypeString(text));
  let col = $derived(fade ? "--text-faded" : "--text");
</script>

<!-- -->
<div style="--font-color: var({col})" class="container {pos}">
  {#each str as par}
    <div class="p">{par}</div>
  {/each}
</div>

<style>
  .container {
    color: var(--font-color);
    position: relative;
    width: 100%;
    height: 100%;
  }
  .p {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-inline: 1ch;
    top: 0;
  }
  :global(.container.top) .p {
    bottom: 0;
  }
  .p:not(:first-of-type) {
    text-indent: 3ch;
  }
</style>
