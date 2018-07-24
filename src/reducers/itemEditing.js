import * as types from './../contants/ActionTypes';

var initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_TASK:
      return action.task;
    case types.RESET_EDITING_TASK:
      state = {}
      return state;
    default:
      return state;
  }
};

export default myReducer;
