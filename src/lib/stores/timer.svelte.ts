import readable from "./readable.svelte.js";

export default function create_timer() {
  return readable(0, (update) => {
    if (typeof window === "undefined") {
      return () => { }; // No-op function for server-side
    }

    console.log("START");

    const interval = setInterval(
      () => update((current_value: number) => ++current_value),
      1000,
    );

    return () => {
      console.log("STOP");

      clearInterval(interval);
    };
  });
}
