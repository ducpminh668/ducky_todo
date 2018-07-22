import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    };
    this.textTaskName = React.createRef();
  }
  componentWillMount() {
    if (this.props.task) {
      const { task } = this.props;
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { task } = nextProps;
    if (task) {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    } else {
      this.setState({
        id: '',
        name: '',
        status: false
      });
    }
  }
  onChange = e => {
    const { target } = e;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.onClear();
    this.props.onSubmit(this.state);
    this.textTaskName.current.focus();
  };
  onClear = () => {
    this.setState({
      name: '',
      status: false
    });
  };
  render() {
    const { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id ? 'Cập nhật công việc' : 'Thêm công việc'}
            <span
              className="fa fa-times-circle pull-right"
              onClick={this.props.onHideForm}
            />
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                ref={this.textTaskName}
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Thêm
              </button>&nbsp;
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
