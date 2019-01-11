import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import PlayerBar from './components/playerBar/PlayerBar';
import QuestList from './components/questList/QuestList';

// libraries
import { constants, hiscores } from 'osrs-api';

// assets
import questList from './assets/quests.json';

// TODO: Create a component to show quest lists and share the possible ones as a prop, also integrate the algorythm
// in this component and check performance, backend will be gone for now.

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      possibleQuests: [],
      showQuests: false
    };
  }

  playerHasRequirements = (requirements, playerStats) => {
    for(const req in requirements) {
      if(requirements[req] > parseInt(playerStats[req].level)) {
          return false;
      }
    }

    return true;
  }

  getPlayerInfo = (playerName, playerType) => {
    let possibleQuests = [], notPossibleQuests = [];

    hiscores.getPlayer({
      name: playerName,
      type: playerType
    }).then((playerStats) => {
      for(const quest in questList) {
          const questReqs = questList[quest].requirements || false;
  
          if(!questReqs) {
              possibleQuests.push(quest);
          } else {
              if(this.playerHasRequirements(questReqs, playerStats)) {
                  possibleQuests.push(quest);
              } else {
                  notPossibleQuests.push(quest);
              }
          }
      }
  
      this.setState({possibleQuests: possibleQuests, showQuests: true});
    }).catch((e) => {
      if(e.response) {
        if(e.response.status === 404)
          console.log('Player Not found.');
        else 
          console.log('Service Error.');
        
      } else {
        console.log('Unexpected error.');
      }
    });
  }

  render = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Quests</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Diaries</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <h3>Osrs Quest Calculator</h3>
          <PlayerBar playerTypes={constants.playerTypes}  calculateQuests={this.getPlayerInfo}/>
          {this.state.showQuests && 
            <QuestList questList={questList} possibleQuests={this.state.possibleQuests}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
