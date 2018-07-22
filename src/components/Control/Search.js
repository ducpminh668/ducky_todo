import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  onChange = e => {
    const { target } = e;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  searchByName = () => {
    this.props.searchByName(this.state.keyword);
  };

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          name="keyword"
          onChange={this.onChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.searchByName}
          >
            <span className="fa fa-search mr-5" />Tìm
          </button>
        </span>
      </div>
    );
  }
}

export default Search;
