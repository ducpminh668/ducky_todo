import * as types from '../contants/ActionTypes';

let initialState = {
  name: '',
  status: -1
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_TABLE:
      if (action.filter.name === 'filterName') {
        state.name = action.filter.value;
        return {
          name: state.name,
          status: state.status
        };
      } else {
        state.status = action.filter.value;
        return {
          name: state.name,
          status: state.status
        };
      }

    default:
      return state;
  }
};

export default myReducer;
