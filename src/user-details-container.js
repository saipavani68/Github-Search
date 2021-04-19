import React, { Component } from 'react';
import {browserHistory} from "react-router-dom";
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
        this.cardClicked = this.cardClicked.bind(this);
    }

    componentDidMount(){
        this.getUserData();
    }

    getUserData() {
        axios.get(`https://api.github.com/search/users?q=${this.props.location.state}&per_page=10&page=${ this.state.activePage }`)
          .then(res => {
            const userData = res.data;
            this.setState({ userData, isLoading: false });
            this.getFollowerCount(userData);
          });
          this.setState({ isLoading: true })
        }   
        
    /* getFollowerCount(userData) {
        const users = userData.items
        users.forEach((user, index) => {
            axios.get(user.followers_url)
                .then(res => {
                const followersData = res.data;
                this.setState({ ...this.state.userData.items, followersCount: followersData.length})
                });
            });
        } */
    
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber}, () => {
            this.getUserData()
        });
    }

    cardClicked(url){
        window.location.replace(url);
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
                        users.map(user => (
                        <Card style={{ width: 600, left: 30 }} key={ user.id } onClick={ () => this.cardClicked(user.html_url) }>
                        <Card.Body>  
                            <Card.Img src={ user.avatar_url } />
                            <Card.Text>
                                <span className="username-header"> {user.login } </span>
                                { user.id }
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