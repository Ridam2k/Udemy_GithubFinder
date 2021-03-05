import React,{Component} from 'react';
import './App.css';

class App extends Component {


  render(){
    const name = "John Doe";

    const foo = () => 'Jane Doe';

    const loading = false;

    const showName = false;

    // if(loading){
    //   return(
    //    <h4>Loading...</h4>
    //   )   
    //   }
    return (
      <div className = "App">
        { 
        loading? 
        ( <h4>Loading</h4>):
        ( 
        // <h1>Hello {showName? name.toUpperCase(): null} from React</h1>
        <h1> Hello {showName && name} from React</h1>
        ) 
        }
        <h2>Hello {foo()} </h2>
      </div>
    );
  }
 
}

export default App;
