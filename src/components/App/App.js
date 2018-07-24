import React, { Component } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import Search from '../Control/Search';
import Sort from '../Control/Sort';
import Header from '../Header/Header';
import TaskList from '../TaskTable/TaskList';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { isDisplayForm } = this.props;
    const classForm = isDisplayForm ? 'col-xs-4' : '';
    const classTable = isDisplayForm ? 'col-xs-8' : 'col-xs-12';
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className={classForm}>
            <TaskForm onHideForm={this.onHideForm} />
          </div>
          <div className={classTable}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.onToggleForm}>
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

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
      dispatch(actions.resetEditingTask())
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
