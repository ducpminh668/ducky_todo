import * as types from '../contants/ActionTypes';
import uuid4 from 'uuid/v4';
import _ from 'lodash';

const data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      const { task } = action;
      console.log(task);
      
      if (task.id) {
        let index = _.findIndex(state, { id: task.id });
        state[index] = {
          id: task.id,
          name: task.name,
          status: task.status
        };
        localStorage.setItem('tasks', JSON.stringify(state));
      } else {
        const newTask = {
          id: uuid4(),
          name: task.name,
          status: task.status
        };
        state.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(state));
      }

      return [...state];
    case types.UPDATE_STATUS_TASK:
      let index = _.findIndex(state, { id: action.taskId });
      state[index] = {
        ...state[index],
        status: !state[index].status
      };
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    case types.DELETE_TASK:
      index = _.findIndex(state, { id: action.taskId });
      state.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
