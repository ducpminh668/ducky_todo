import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import './TaskList.css';
import * as actions from '../../actions';
// import _ from 'lodash';
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    };
  }

  changeInput = e => {
    const { target } = e;
    const name = target.name;
    let value = target.value;
    if (name === 'filterStatus') {
      value = parseInt(value, 10);
    }
    this.props.onFilterTable({
      name: name,
      value: value
    });
  };

  render() {
    let { tasks, filterTable } = this.props;
    if (filterTable.name) {
      tasks = tasks.filter(task => {
        return (
          task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        );
      });
    }

    if (filterTable.status !== -1) {
      tasks = tasks.filter(item => {
        return item.status === (filterTable.status === 1)
      })
    }
    const element = tasks.map((item, index) => {
      return <TaskItem key={item.id} task={item} index={index} />;
    });
    return (
      <table className="table table-bordered table-hover TaskList">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={this.filterName}
                onChange={this.changeInput}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                onChange={this.changeInput}>
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          {element}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable
  };
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTask(filter));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProp
)(TaskList);
