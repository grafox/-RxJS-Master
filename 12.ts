import './style.css';
console.clear();
// begin lesson code

import { asyncScheduler, asapScheduler, queueScheduler, of } from 'rxjs';
import { observeOn, subscribeOn, tap} from 'rxjs/operators';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

/*
 * The queueScheduler executes tasks synchronously by default,
 * allowing you to queue tasks inside other tasks.
 */
asyncScheduler.schedule(() => console.log('asyncScheduler'));
asapScheduler.schedule(() => console.log('asapScheduler'));
queueScheduler.schedule(() => console.log('queueScheduler'));
console.log('synchronous');

/*
 * Scheduling tasks with queue scheduler inside another
 * queue will always execute the outer tasks first.
 */
queueScheduler.schedule(() => {
  queueScheduler.schedule(() => {
    console.log('inside second queue');
    queueScheduler.schedule(() => {
      console.log('inside third queue');
    });
  });
  console.log('inside first queue');
})

