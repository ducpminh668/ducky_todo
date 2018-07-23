import { createStore } from 'redux';
import { status, sort } from './actions';
import myReducer from './reducers';

const store = createStore(myReducer);
console.log('Default', store.getState());

//change status
// store.dispatch(status());
// console.log('change status', store.getState());

store.dispatch(sort({ by: 'name', value: -1 }));
console.log('change sort', store.getState());

export default '';
