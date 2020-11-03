import './style.css';
console.clear();
// begin lesson code

import { animationFrameScheduler, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const ball = document.getElementById('ball');
/*
 * The animationFrameScheduler let's you schedule
 * tasks before browser repaint.
 */
// animationFrameScheduler.schedule(function(position){
//   ball.style.transform = `translate3d(0, ${position}px, 0`;
//   if(position <= 200) {
//     this.schedule(position + 1)
//   }
// }, 0, 0);

interval(0, animationFrameScheduler).pipe(
  takeWhile(val => val <= 200)
).subscribe(val => {
  ball.style.transform = `translate3d(0, ${val}px, 0`;
});

