import './style.css';
console.clear();

// begin lesson code
import { fromEvent, throwError, timer, range, of, Observable } from 'rxjs';
import { takeUntil, finalize, zip, mergeMap, retryWhen, mergeMapTo, catchError } from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click');

export const genericRetryStrategy = ({
  retryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  retryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
} = {}) => (obs: Observable<any>) => {
  return obs.pipe(
    retryWhen(attempts => {
      return attempts.pipe(
        mergeMap((error, i) => {
          const attemptNumber = i + 1;
          if (
            attemptNumber > retryAttempts ||
            excludedStatusCodes.find(e => e === error.status)
          ) {
            console.log('Giving up!');
            return throwError(error);
          }
          console.log(
            `Attempt ${attemptNumber}: retrying in ${attemptNumber *
            scalingDuration}ms`
          );
          return timer(attemptNumber * scalingDuration);
        })
      );
    })
  );
};

/* 
 * Instead of dragging all of the retry logic around,
 * we can extract it into a customizable function
 * that can be used throughout our application.
 */
// click$.pipe(
//   mergeMapTo(throwError({
//     status: 400,
//     message: 'Server error'
//   }).pipe(
//       retryWhen(attempts => {
//         return attempts.pipe(
//           mergeMap((error, i) => {
//             const attemptNumber = i + 1;
//             if (
//               attemptNumber > 3 ||
//               [404, 500].find(e => e === error.status)
//             ) {
//               console.log('Giving up!');
//               return throwError(error);
//             }
//             console.log(
//               `Attempt ${attemptNumber}: retrying in ${attemptNumber *
//               1000}ms`
//             );
//             return timer(attemptNumber * 1000);
//           })
//         );
//       }),
//       catchError(err => of(err.message))
//     )
//   )
// ).subscribe(console.log);

// simulate network request with error
click$.pipe(
  mergeMapTo(throwError({
    status: 500,
    message: 'Server error'
  }).pipe(
    genericRetryStrategy({
      retryAttempts: 4,
      scalingDuration: 2000
    }),
    // you may want different catching strategy depending on page
    catchError(err => of(err.message))
  ))
).subscribe(console.log);
