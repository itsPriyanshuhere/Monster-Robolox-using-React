import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component{

//mapping Array to elemnets
constructor(){
  super();
  this.state = {
   monsters:[],
   searchField:'',
   title:''
  };
}

//LIFECYCLE METHODS:
componentDidMount(){
  // first time component gets placed on the DOM. Only happens once unless it unmounted.
  fetch('https://jsonplaceholder.typicode.com/users')//fetch the api's content.
  .then((response) => response.json())// executes after we get a response from the api
  .then((users) => this.setState(() =>{
    return {monsters: users}
  },() => { console.log(this.state)}))
}

  onSearchChange = (event) => {
  console.log(event.target.value);
  const searchField = event.target.value.toLocaleLowerCase();
  
    this.setState(() => {
      return{searchField};
    });
 }

  render(){

    const {monsters,searchField} = this.state; //destructuring the code
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster) =>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    
    return (
      <div className="App" >
          <h1 className='app-title'>Monsters Rolodex</h1>
          <SearchBox className="search-box" placeholder='Search Monsters' onChangeHandler= {onSearchChange} />
          <CardList monsters = {filteredMonsters} />
      </div>
    );
  
  }
}



export default App;

