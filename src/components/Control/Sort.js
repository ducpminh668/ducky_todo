import React, { Component } from 'react';
import './Sort.css';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: 'name',
        value: 1
      }
    };
  }

  onClick = (sortBy, sortValue) => {
    this.setState(
      {
        sort: {
          by: sortBy,
          value: sortValue
        }
      },
      () => {
        this.props.onSort(this.state.sort);
      }
    );
  };
  render() {
    const { sort } = this.state;
    return (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a
              role="button"
              onClick={() => this.onClick('name', 1)}
              className={
                sort.by === 'name' && sort.value === 1 ? 'Sort_selected' : ''
              }
            >
              <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
            </a>
          </li>
          <li>
            <a
              role="button"
              onClick={() => this.onClick('name', -1)}
              className={
                sort.by === 'name' && sort.value === -1 ? 'Sort_selected' : ''
              }
            >
              <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
            </a>
          </li>
          <li role="separator" className="divider" />
          <li>
            <a
              role="button"
              onClick={() => this.onClick('status', 1)}
              className={
                sort.by === 'status' && sort.value === 1 ? 'Sort_selected' : ''
              }
            >
              Trạng Thái Kích Hoạt
            </a>
          </li>
          <li>
            <a
              role="button"
              onClick={() => this.onClick('status', -1)}
              className={
                sort.by === 'status' && sort.value === -1 ? 'Sort_selected' : ''
              }
            >
              Trạng Thái Ẩn
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sort;
