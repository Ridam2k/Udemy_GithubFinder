import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserItem = ( {user:{login, html_url,avatar_url} }) =>{    //Another way of sirectly destructuring props
  


        return (
        <div className = "card text-center">
            <img src = {avatar_url} className="round-img" alt= "avatar of user" 
            style ={{width:'60px'}}/>
            <h3>{login}</h3>

            <div>
                {/* <a href={html_url} className="btn btn-dark btn-sm my-1">Visit Profile</a> */}
                <Link to = {`/user/${login}`} className="btn btn-dark btn-sm my-1" >Visit Profile</Link>
            </div>
        </div>
        )
      
}
UserItem.propTypes =
{
    user : PropTypes.object.isRequired,
};
//The entire user is being passed as a prop and it is an object
export default UserItem;
