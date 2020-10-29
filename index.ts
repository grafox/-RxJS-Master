import './style.css';
console.clear();

// begin lesson code
import { ObservableStore } from './store';

const store = new ObservableStore({
  user: 'joe',
  isAuthenticated: true
});

/*
 * Select a slice of state from store.
 */
store.selectState('user').subscribe(console.log);

/*
 * Update a property with new value.
 */
store.updateState({
  user: 'bob'
});

store.updateState({
  isAuthenticated: true
});

/*
 * Selected state above (user) only emits when value has changed
 * for the requested property.
 */
store.updateState({
  isAuthenticated: false
});