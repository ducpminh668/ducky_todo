import * as types from '../contants/ActionTypes';

export const listAll = () => {
  return {
    type: types.LIST_ALL
  };
};

export const saveTask = task => {
  return {
    type: types.SAVE_TASK,
    task
  };
};

export const toggleForm = () => {
  return {
    type: types.TOGGLE_FORM
  };
};

export const openForm = () => {
  return {
    type: types.OPEN_FORM
  };
};

export const closeForm = () => {
  return {
    type: types.CLOSE_FORM
  };
};

export const updateStatus = taskId => {
  return {
    type: types.UPDATE_STATUS_TASK,
    taskId
  };
};

export const deleteTask = taskId => {
  return {
    type: types.DELETE_TASK,
    taskId
  };
};

export const editTask = task => {
  return {
    type: types.EDIT_TASK,
    task
  }
}

export const resetEditingTask = () => {
  return {
    type: types.RESET_EDITING_TASK,
  }
}

export const filterTask = filter => {
  return {
    type: types.FILTER_TABLE,
    filter
  }
}