import React, { Component } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

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
    this.setState(
      {
        [name]: value
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  render() {
    const { tasks } = this.props;
    const element = tasks.map((item, index) => {
      return (
        <TaskItem
          key={item.id}
          task={item}
          index={index}
          onUpdateStatus={this.props.onUpdateStatus}
          onDeleteTask={this.props.onDeleteTask}
          onUpdate={this.props.onUpdate}
        />
      );
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
                onChange={this.changeInput}
              >
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

export default TaskList;
