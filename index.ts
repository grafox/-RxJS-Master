import './style.css';
console.clear();
// begin lesson code

import { Subject, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const subject = new Subject();

/*
 * Subjects are both observables and observers,
 * meaning they have a pipe and subscibe method, as well
 * as next, error, and complete methods to emit values
 * to any observers of the subject.
 * 
 * For instance, we can subscribe to the subject like
 * any other observable.
 */
const subscription = subject.subscribe(observer);

/*
 * We can then use the subject to emit notifications to any
 * registered observers by calling the next method with
 * the value. This is similar to an EventEmitter.
 */
subject.next('Hello');

/*
 * Late subscribers to the Subject will not receive
 * previously emitted values, for instance this subscriber
 * will not receieve the value 'Hello', which was emitted before.
 * Other variations of Subjects do allow the delivery
 * of previously emitted values, and will be discussed instance
 * the following lessons.
 */
const secondSubscription = subject.subscribe(observer);

subject.next('World');

/*
 * Subjects are multicast, meaning instead of each new subscriber
 * creating it's own execution path, subscribers are instead
 * registered to the subject, with each being delivered the same
 * notifications as the occur.
 * 
 * To see this more clearly, let's create an interval observable.
 * We can also add on a console.log for each time the
 * interval emits.
 */
const interval$ = interval(2000).pipe(
  tap(i => console.log('new interval', i))
);

/*
 * With normal, unicast observables, each subscriber would cause
 * a new interval to be created. We can see this by the fact
 * 'new interval' is being emitted twice.
 */
// interval$.subscribe(observer);
// interval$.subscribe(observer);

/*
 * With a subject, we can share this execution by
 * first subscribing the subject to the interval$
 * observable, then subscribing to that subject.
 * 
 * Remember, Subjects are observers with next methods,
 * so you can subscribe it directly to another observable.
 */
// interval$.subscribe(subject);

/*
 * This method of sharing an execution is so common
 * that RxJS offers a variety of operators which use subjects
 * behind the scenes to turn a typical unicast observable
 * into a multicast observable. We will explore these in detail
 * in the subsequent lessons.
 */
