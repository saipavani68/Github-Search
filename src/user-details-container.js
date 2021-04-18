import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Pagination from "react-js-pagination";
import "./user-details.css";

export default class UserDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            userData: [],
            isLoading: true
        };
    }

    componentDidMount(){
        this.getUserData();
    }

    getUserData() {
        axios.get(`https://api.github.com/search/users?q=${this.props.location.state}&per_page=10&page=${ this.state.activePage }`)
          .then(res => {
            const userData = res.data;
            this.setState({ userData, isLoading: false });
          });
          this.setState({ isLoading: true })
        }    
    
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber}, () => {
            this.getUserData()
        });
    }

    cardClicked(){
        console.log("inside card clicked");
    }

    render() {
        const { userData } = this.state
        const users = userData && userData.items
        const checkIfUsersNotEmpty = users && users.length > 0 
          return (
            <div className="users-details-container">
                { !this.state.isLoading ? 
                <div>
                    { checkIfUsersNotEmpty && <h3 className="total-users-text"> { userData.total_count } users </h3> }
                    { checkIfUsersNotEmpty &&
                        users.map((user, index) => (
                        <Card style={{ width: 600, left: 30 }} key={ index } onClick={ this.cardClicked }>
                        <Card.Body>  
                            <Card.Img src={ user.avatar_url } />
                            <Card.Text>
                                <span className="username-header"> {user.login } </span>
                                {user.id}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    ))}
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={ 5 }
                        itemClass="page-item"
                        linkClass="page-link"
                        totalItemsCount={ 100 }
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div> 
                : 
                <div> Loading... </div> }
            </div>
        );
    }
}