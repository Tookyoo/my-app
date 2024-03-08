import React, { Component } from 'react'
import CardList from '../components/CardList'
/* import { robots } from './robots' */
import SearchBox from '../components/SearchBox'
import '../containers/App.css'
import Scroll from '../components/Scroll'

// this is how we create a state, using class then extends Component
class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchfield: ""
    }
  }

  componentDidMount() { // this is an API
    fetch('https://jsonplaceholder.cypress.io/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) })
  }

  onSearchChange = event => { // You cant put a random name in the function  
    /*console.log(event.target.value) */
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    return !robots.length // it returns loading when you return an empty object
      ? <h1 className='tc'>Loading...</h1>
      : (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      )
  }
}

export default App;
// reference Building a React App 4 video