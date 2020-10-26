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
const interval$ = interval(2000).pipe(
  tap(i => console.log('new interval', i))
);

interval$.subscribe(subject);

const subscription = subject.subscribe(observer);
const secondSubscription = subject.subscribe(observer);
