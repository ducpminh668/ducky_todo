import * as types from '../constants/ActionTypes';

const initialState = {
  by: 'name',
  value: 1
};

const myReducer = (state = initialState, action) => {
  if (action.type === types.SORT) {
    const { by, value } = action.sort;
    return {
      by,
      value
    };
  }
  return state;
};

export default myReducer;
