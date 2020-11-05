import './style.css';
console.clear();

// begin lesson code
import { interval, fromEvent, throwError } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

// elems
const counter = document.getElementById('counter');

// streams
const click$ = fromEvent(document, 'click');

// const sub = interval(1000).subscribe({
//   next: (val: any) => {
//     counter.innerHTML = val;
//   },
//   complete: () => {
//     counter.innerHTML = 'Stopped!'
//   }
// });

// calling unsubscribe will not trigger complete callbacks
// setTimeout(() => {
//   sub.unsubscribe();
// }, 2000);

// operators that complete observables will, like take and takeUntil
// interval(1000).pipe(
//   takeUntil(click$)
// ).subscribe({
//   next: (val: any) => {
//     counter.innerHTML = val;
//   },
//   complete: () => {
//     counter.innerHTML = 'Stopped!'
//   }
// });

/*
 * You can also use finalize, which lets you run a function
 * on completion of the observable. This is good for misc side-effects,
 * but note, like tap, does not actually emit a returned item.
 * 
 * If you need to emit a final value on completion you can use
 * the endWith operator instead.
 */
interval(1000).pipe(
  takeUntil(click$),
  finalize(() => counter.innerHTML = 'Stopped!')
).subscribe((val: any) => counter.innerHTML = val);

/*
 * finalize function will also be called if an error
 * occurs.
 */
// throwError(new Error('Oops!')).pipe(
//   takeUntil(click$),
//   finalize(() => counter.innerHTML = 'Stopped!')
// ).subscribe((val: any) => counter.innerHTML = val);

