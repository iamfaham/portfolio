// export function throttle(func: Function, limit: number) {
//     let lastFunc: NodeJS.Timeout;
//     let lastRan: number;
//     return function (...args: any[]) {
//       if (!lastRan) {
//         func(...args);
//         lastRan = Date.now();
//       } else {
//         clearTimeout(lastFunc);
//         lastFunc = setTimeout(() => {
//           if (Date.now() - lastRan >= limit) {
//             func(...args);
//             lastRan = Date.now();
//           }
//         }, limit - (Date.now() - lastRan));
//       }
//     };
//   }
  

export function throttle(func: (...args: any[]) => void, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
