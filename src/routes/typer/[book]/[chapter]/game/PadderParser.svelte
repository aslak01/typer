<script lang="ts">
  let {
    text,
    fade = false,
    pos,
  }: { text: string; fade: boolean; pos: string } = $props();
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
  let dir = $derived(fade ? "bottom" : "top");
</script>

<!-- -->
<div style="--font-color: var({col})" class="container {dir}">
  {#each str as par}
    <div class="p">{par}</div>
  {/each}
</div>

<style>
  .container {
    color: var(--font-color);
    position: absolute;
  }
  :global(.bottom) {
    bottom: 0;
  }
  :global(.top) {
    top: 0;
  }
  .p {
    padding-inline: 1ch;
  }
  .p:not(:first-of-type) {
    text-indent: 3ch;
  }
</style>
