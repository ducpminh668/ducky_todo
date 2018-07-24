import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
  };
  onUpdateTask =() => {
    this.props.onToggle()
    this.props.onEditTask()
  }
  
  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true
                ? 'label label-danger'
                : 'label label-success'
            }
            onClick={this.onUpdateStatus}>
            {task.status === true ? 'Kích hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onUpdateTask}>
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.onDeleteTask}>
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemEdit: state.itemEditing
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: () => {
      dispatch(actions.updateStatus(props.task.id));
    },
    onDeleteTask: () => {
      dispatch(actions.deleteTask(props.task.id));
    },
    onToggle: () => {
      dispatch(actions.toggleForm())
    },
    onEditTask: () => {
      dispatch(actions.editTask(props.task))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);
