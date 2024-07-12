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
    return croppedStr
      .replaceAll("→", "<span class='preview-tab-char'></span>")
      .split("↪");
  }
  let str = $derived(parseTypeString(text));
  let col = $derived(fade ? "--text-faded" : "--text");
</script>

<!-- -->
<div style="--font-color: var({col})" class="container {pos}">
  <p class="p">{@html str}</p>
</div>

<style>
  .container {
    color: var(--font-color);
    overflow: hidden;
    max-height: 100%;
    height: 100%;
    width: 100%;
    padding-inline: 1ch;
    position: relative;
  }
  p.p {
    font-size: var(--font-size-4);
    position: absolute;
    bottom: 0;
  }
  .container.bottom p.p {
    bottom: unset;
    top: 0;
  }
  .p:not(:first-of-type) {
    text-indent: 3ch;
  }
  :global(span.preview-tab-char) {
    display: inline-block;
    width: 3ch;
  }
</style>
