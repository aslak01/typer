<div class="container">
  <slot />
</div>

<style>
  @import "open-props/postcss/style";
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
  }
</style>
