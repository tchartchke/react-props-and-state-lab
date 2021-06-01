import React from 'react'

class Pet extends React.Component {
  petGender = () => {
    return (this.props.pet.gender === 'male') ? '♂' : '♀'
  }

  renderAdoptionButton = () => {
    if (this.props.pet.isAdopted){
      return <button className="ui disabled button">Already adopted</button>
    } else {
      return <button onClick={e => this.props.onAdoptPet(this.props.pet.id)} className="ui primary button">Adopt pet</button>
    } 
  }

  render() {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.petGender()}
            {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.renderAdoptionButton()}
        </div>
      </div>
    )
  }
}

export default Pet
