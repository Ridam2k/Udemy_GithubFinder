import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props)
    {
        super();
        this.state= {
            text : ''      //Prop of Search declared here
        }
        this.onChange = this.onChange.bind(this);
    };
    

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.text==='')
        {
            this.props.setAlert('Please enter a valid string', 'light');   
        }
        else{
        this.props.searchUsers(this.state.text);  //Then  pass up props 
        // console.log(this.state.text)
        this.setState({text:''})
        }
    }

    render() {

        const {showClear, clearUsers}= this.props;

        return (
            <div>
                <form className= "form"
                onSubmit= {this.onSubmit.bind(this)}>  
                {/* //first pass to a function */}
                    <input 
                    type="text" 
                    name ="text" 
                    placeholder="Search Users..." 
                    value={this.state.text}
                    onChange = {this.onChange}/>
                    <input type="submit" value= "Search" className= "btn btn-dark btn-block" />
                </form>
                {showClear && (                //If show is true then show button
                <button className="btn btn-light btn-block" 
                onClick={clearUsers}>Clear
                </button>)}
            </div>
        )
    }
}

Search.propTypes = {
    searchUsers :PropTypes.func.isRequired,
    clearUsers : PropTypes.func.isRequired,
    showClear : PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}
export default Search;
