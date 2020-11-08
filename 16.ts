import './style.css';
console.clear();

// begin lesson code
import { interval, fromEvent, Subject } from 'rxjs';
import { takeUntil, map, throttleTime } from 'rxjs/operators';

/*
 * 1st approach, explicitly unsubscribe to every
 * subscription.
 */
// const clickSub = fromEvent(document, 'click').pipe(
//   map((event: any) => ({
//     x: event.clientX,
//     y: event.clientY
//   }))
// ).subscribe(v => {
//   // take action
//   console.log(v);
// });

// const scrollSub = fromEvent(document, 'scroll').pipe(
//   throttleTime(30)
// ).subscribe(v => {
//   // take action
//   console.log(v);
// });

// const intervalSub = interval(1000).subscribe(v => {
//   // take action
//   console.log(v);
// });

// setTimeout(() => {
//   clickSub.unsubscribe();
//   scrollSub.unsubscribe();
//   intervalSub.unsubscribe();
// });

/*
 * 2nd approach, add all subscriptions together and
 * unsubscribe at once.
 */
// const subscription = fromEvent(document, 'click').pipe(
//   map((event: any) => ({
//     x: event.clientX,
//     y: event.clientY
//   }))
// ).subscribe(v => {
//   // take action
//   console.log(v);
// });

// subscription.add(
//   fromEvent(document, 'scroll').pipe(
//     throttleTime(30)
//   ).subscribe(v => {
//     // take action
//     console.log(v);
//   })
// );

// subscription.add(
//   interval(1000).subscribe(v => {
//     // take action
//     console.log(v);
//   })
// );

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 2000);

/*
 * 3rd (my preferred) approach, use a Subject and the
 * takeUntil operator to automate the unsubscribe
 * process on a hook.
 */
const onDestroy$ = new Subject();

fromEvent(document, 'click').pipe(
  map((event: any) => ({
    x: event.clientX,
    y: event.clientY
  })),
  takeUntil(onDestroy$)
).subscribe(v => {
  // take action
  console.log(v);
});

fromEvent(document, 'scroll').pipe(
  throttleTime(30),
  takeUntil(onDestroy$)
).subscribe(v => {
  // take action
  console.log(v);
})

interval(1000).pipe(
  takeUntil(onDestroy$)
).subscribe(v => {
  // take action
  console.log(v);
});

setTimeout(() => {
  onDestroy$.next();
  onDestroy$.complete();
}, 2000);
