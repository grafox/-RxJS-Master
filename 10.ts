import './style.css';
console.clear();
// begin lesson code

import { asyncScheduler, asapScheduler, of } from 'rxjs';
import { observeOn, subscribeOn, tap} from 'rxjs/operators';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

/*
 * The asapScheduler executes tasks asynchronously but
 * 'as quickly as possible', similar to microtasks.
 * For instance, even though our task scheduled with
 * the asapScheduler appears after the asyncScheduler
 * task, it will be executed before, but not before the 
 * synchronous console.log. This is the same behavior
 * you would see with Promise.resolve or queueMicrotask.
 */
asyncScheduler.schedule(() => console.log('asyncScheduler'));
// queueMicrotask(() => console.log('queueMicrotask'));
// Promise.resolve('fromPromise').then(console.log);
asapScheduler.schedule(() => console.log('asapScheduler'));
console.log('synchronous');

/*
 * Like other schedulers it can be provided as an
 * argument to most static operators, or by using the observeOn
 * or subscribeOn operators.
 */
// as argument to static operator
// of(1,2,3, asapScheduler).subscribe(observer);

// using observeOn
// of(1,2,3).pipe(
//   // logging values before scheduler
//   tap(observer),
//   observeOn(asapScheduler)
// ).subscribe(observer);

// using subscribeOn
// of(1,2,3).pipe(
//   tap(observer),
//   subscribeOn(asapScheduler)
// ).subscribe(observer);
