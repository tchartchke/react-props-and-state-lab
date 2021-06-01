import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  findPets = () => {
    let fetchURL = '/api/pets'
    if (this.state.filters.type !== 'all') fetchURL += `?type=${this.state.filters.type}`
    fetch(fetchURL).then(res => res.json()).then(fetchedPets => {
      this.setState({
        pets: fetchedPets
      })
    })
  }

  adoptPet = (id) => {
    const idx = this.state.pets.findIndex(pet => pet.id === id)
    const adopted = this.state.pets[idx]
    adopted.isAdopted = true

    const updatedPets = [...this.state.pets.slice(0,idx), adopted, ...this.state.pets.slice(idx+1)]

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.findPets} onChangeType={this.changeType} value={this.state.filters.type}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
