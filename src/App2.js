import React,{Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import axios from 'axios';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

  // componentDidMount(){
  //   console.log("App Mounted")
  //   axios.get('https://api.github.com/users')
  //   .then(res => console.log('res.data'));
  // }
  constructor(props){
    super();
    this.state = {
      users: [],
      loading : false,
      alert : null
    }
  }

  async componentDidMount() {

    this.setState({loading: true})

    const res = 
    await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret= 
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    //Response recieved so :
    this.setState({users: res.data, loading : false});
  }


  async searchUsers(text) {              //Received props
    
    this.setState({loading:true})
    const res = 
    await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret= 
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    //Response recieved so :
    this.setState({users: res.data.items, loading : false});
  }


  clearUsers(){
    this.setState({users:[], loading: false});
  }

  setAlert(msg, type){                  //Received props

    this.setState( { alert: {msg , type } } );

    setTimeout(
      ()=> this.setState({ alert: null} ),
      5000
    )
  };


  render(){

    const {users,loading} = this.state;

    return (
      <Router>
      <div className = "App">

          <Navbar title = "Github Finder" icon= "fab fa-github"/>
        <div className="container">
          <Alert alert= {this.state.alert}/>      
          {/* Pass props to alert */}
          <Search searchUsers= {this.searchUsers.bind(this)} 
          clearUsers= {this.clearUsers.bind(this)}
          showClear= {users.length > 0 ? true : false}
          setAlert = {this.setAlert.bind(this)}/>  
          {/* Prop searchUsers received 
          clearUsers, showClearpassed*/}
        <Users loading = {loading} users = {users}/>
        {/* Props passed */}
        </div>
        
      </div>
      </Router>
    );
  }
 
}

export default App;
