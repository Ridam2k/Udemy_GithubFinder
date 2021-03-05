import React, { Component } from 'react'

class UserItem extends Component {
    constructor()
    {
        super();
        this.state={
            id:'id',
            login:'mojombo',
            avatar_url : 'https://avatars.githubusercontent.com/u/1?v=4',
            html_url : 'https://github.com/mojombo'
        }
    }
  
    render() {

        const{login, html_url,avatar_url} = this.state;  //Destructuring so that we don't have to use this.state

        return (
        <div className = "card text-center">
            <img src = {avatar_url} className="round-img" alt= "avatar of user" 
            style ={{width:'60px'}}/>
            <h3>{login}</h3>

            <div>
                <a href={this.state.html_url} className="btn btn-dark btn-sm my-1">Visit Profile</a>
            </div>
        </div>
        )
    
    }
}
 
export default UserItem
