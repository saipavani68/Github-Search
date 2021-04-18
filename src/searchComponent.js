import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import "./searchComponent.css";

class SearchComponent extends Component {

    constructor(props) {
        super(props);

        this.state= {
            searchValue: ''
        };
        
        this.onClickSearch = this.onClickSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    onClickSearch(e) {
        e.preventDefault();
        this.props.history.push({ pathname: '/users', state: this.state.searchValue });
    }

    handleChange(e){
        this.setState({ searchValue: e.target.value })
    }

    render() {
        return (
            <div className="form-container">
                <h2 className="form-header">Search more than 69M users</h2>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group"> 
                        <input  type="text"
                                className="form-control"
                                placeholder="Search GitHub"
                                onChange= { this.handleChange }
                                />
                        <input type="button" value="Search" className="btn btn-primary search-button" onClick={ this.onClickSearch } />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchComponent)
