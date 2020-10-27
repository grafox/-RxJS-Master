import './style.css';
console.clear();
// begin lesson code

import { BehaviorSubject, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

/*
 * BehaviorSubject's accept an argument, the initial seed value.
 * This value will be emitted to subscribers until .next is called
 * again. New subscribers to BehaviorSubject's always receieve the
 * last emitted value on subscription.
 */
const subject = new BehaviorSubject('Hello');

/*
 * Subscribers to the BehaviorSubject will receieve the seed value,
 * or last emitted value. In this case no other value has been
 * emitted so the subscriber will initially receive 'Hello'
 */
const subscription = subject.subscribe(observer);

/*
 * Emit 'World' to all subscribers, just the observer above
 * right now.
 */
subject.next('World');

/*
 * Contrary to the normal Subject, BehaviorSubject will deliver the last
 * emitted value to late subscribers. In this case our subscriber
 * will receive 'World' immediately.
 */
const secondSubscription = subject.subscribe(observer);

subject.next('Goodbye!');

/*
 * You can also access the current value of the BehaviorSubject
 * synchronously by calling getValue(), although this is
 * generally not advised.
 */
console.log('getValue()', subject.getValue());