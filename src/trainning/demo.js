import {createStore} from 'redux';

import { status, sort } from './actions';

const initialState = {
	status: false,
	sort: {
		by: 'name',
		value: 1
	}
}

const myReducer = (state = initialState, action) => {
	if (action.type === 'TOGGLE_STATUS') {
		state.status = !state.status
	}
	if (action.type === 'SORT') {
		const { sort } = action
		return Object.assign({status: state.status}, sort)
	}
	return state
}

const store = createStore(myReducer);


console.log('Default', store.getState());

//change status
store.dispatch(status())
console.log('ChangeStatus', store.getState());


store.dispatch(sort({by: 'name', value: -1}))
console.log('Sort', store.getState());

export default ''