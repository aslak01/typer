// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
  declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
      outsideclick?: (e: CustomEvent) => void;
    }
  }
}

export {};
