// import { tick } from "svelte";
//
// type UpdateCallback = (current_value: number) => number;
// type StartFunction = (update: (fn: UpdateCallback) => void) => () => void;
//
// export default function readable(initial_value: number, start: StartFunction) {
//   let value = $state(initial_value);
//
//   let subscribers = 0;
//
//   let stop: null | (() => void) = null;
//
//   return {
//     get value() {
//       if ($effect.active()) {
//         $effect(() => {
//           if (subscribers++ === 0) {
//             stop = start((fn: (arg: number) => number) => {
//               value = fn(value);
//             });
//           }
//
//           return () => {
//             tick().then(() => {
//               if (--subscribers === 0) {
//                 stop?.();
//                 stop = null;
//               }
//             });
//           };
//         });
//       }
//
//       return value;
//     },
//   };
// }
