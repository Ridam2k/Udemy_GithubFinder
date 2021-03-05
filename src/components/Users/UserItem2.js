import React, { Component } from 'react'

class UserItem extends Component {
  
    render() {

        const{login, html_url,avatar_url} = this.props.user;  //Destructuring so that we don't have to use this.state

        return (
        <div className = "card text-center">
            <img src = {avatar_url} className="round-img" alt= "avatar of user" 
            style ={{width:'60px'}}/>
            <h3>{login}</h3>

            <div>
                <a href={html_url} className="btn btn-dark btn-sm my-1">Visit Profile</a>
            </div>
        </div>
        )
    
    }
}
 
export default UserItem
