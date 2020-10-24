import './style.css';
console.clear();
// begin lesson code
import { Subject } from 'rxjs'; 
import { loadingService } from './loadingService';

const loadingOverlay = document.getElementById('loading-overlay');

// const loading$ = new Subject();

// loading$.subscribe(isLoading => {
//   if(isLoading) {    
//     loadingOverlay.classList.add('open');    
//   } else {    
//     loadingOverlay.classList.remove('open')
//   }
// });

// loading$.next(true);

// setTimeout(() => loading$.next(false), 1500);


loadingService.loadingStatus$.subscribe(isLoading => {
  if(isLoading) {    
    loadingOverlay.classList.add('open');    
  } else {    
    loadingOverlay.classList.remove('open')
  }
});

loadingService.showLoading();

setTimeout(() => loadingService.hideLoading(), 1500);

