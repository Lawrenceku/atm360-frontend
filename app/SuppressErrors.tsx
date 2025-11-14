// "use client";

// export function DisableReactErrors() {
//   useEffect(() => {
//     // Hide hydration warnings
//     const originalError = console.error;
//     console.error = (...args) => {
//       if (typeof args[0] === "string" && args[0].includes("hydration"))
//         return;
//       originalError.apply(console, args);
//     };
//   }, []);

//   return null;
// }


"use client";

import { useEffect } from "react";

export default function SuppressErrors() {
  useEffect(() => {
    console.error = () => {}; 
  }, []);

  return null;
}
