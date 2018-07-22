import React, { Component } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import Search from '../Control/Search';
import Sort from '../Control/Sort';
import Header from '../Header/Header';
import TaskList from '../TaskTable/TaskList';
import uuid4 from 'uuid/v4';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }
  onToogleForm = () => {
    this.setState({
      isDisplayForm: true,
      taskEditing: null
    });
  };
  onHideForm = e => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null
    });
  };
  onSubmit = data => {
    const { tasks } = this.state;
    if (data.id === '') {
      const task = {
        id: uuid4(),
        name: data.name,
        status: data.status === 'true' ? true : false
      };
      tasks.push(task);
    } else {
      let index = tasks.findIndex(item => item.id === data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onHideForm();
  };
  onUpdateStatus = taskId => {
    let { tasks } = this.state;
    tasks = tasks.map(item => {
      if (item.id === taskId) {
        item.status = !item.status;
      }
      return item;
    });
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  onDeleteTask = taskId => {
    let { tasks } = this.state;
    const taskIndex = tasks.findIndex(item => item.id === taskId);
    tasks.splice(taskIndex, 1);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  onUpdate = task => {
    this.setState({
      taskEditing: task
    });
    this.onShowForm();
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };
  onFilter = filter => {
    const { filterName, filterStatus } = filter;
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    });
  };
  searchByName = name => {
    this.setState({
      keyword: name
    });
  };
  onSort = sort => {
    console.log(sort);

    this.setState({
      sort: {
        by: sort.by,
        value: sort.value
      }
    });
  };
  render() {
    let {
      tasks,
      isDisplayForm,
      taskEditing,
      filter,
      keyword,
      sort
    } = this.state;
    if (filter.name) {
      tasks = tasks.filter(task => {
        return (
          task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
        );
      });
    }

    if (filter.status !== -1) {
      tasks = tasks.filter(task => {
        return task.status === (filter.status === 1);
      });
    }

    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }

    const elementForm = isDisplayForm ? (
      <TaskForm
        onHideForm={this.onHideForm}
        onSubmit={this.onSubmit}
        task={taskEditing}
      />
    ) : (
      ''
    );
    const classForm = isDisplayForm ? 'col-xs-4' : '';
    const classTable = isDisplayForm ? 'col-xs-8' : 'col-xs-12';
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className={classForm}>{elementForm}</div>
          <div className={classTable}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToogleForm}
            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <div className="row mt-15">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Search searchByName={this.searchByName} />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Sort onSort={this.onSort} />
              </div>
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDeleteTask={this.onDeleteTask}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
