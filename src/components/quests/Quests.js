import React, { Component } from 'react';

// components
import PlayerBar from './playerBar/PlayerBar';
import QuestList from './questList/QuestList';
import QuestDetails from './questDetails/QuestDetails';

// libraries
import { hiscores } from 'osrs-api';

// assets
import questList from '../../assets/quests.json';
import constants from '../../assets/constants';

class Quests extends Component {
  constructor() {
    super();
    
    this.state = {
      possibleQuests: [],
      showQuests: false,
      showQuestDetails: false,
      questToShow: {},
      errors: ''
    };
  }

  getQuestDetails = (e) => {
    const questId = e.target.dataset.id;
    this.setState({questToShow: questList[questId], showQuestDetails: true});
  }

  playerHasRequirements = (requirements, playerStats, ironmanRequirements) => {
    for(const req in requirements) {
      if(requirements[req] > parseInt(playerStats[req].level)) {
        return false;
      }
    }
    if(ironmanRequirements) {
      for(const req in ironmanRequirements) {
        if(ironmanRequirements[req] > parseInt(playerStats[req].level)) {
          return false;
        }
      }
    }

    return true;
  }

  getPlayerInfo = (playerName, playerType) => {
    let possibleQuests = [], notPossibleQuests = [];

    hiscores.getPlayer({
      name: playerName,
      type: 'normal'
    }).then((playerStats) => {
      for(const quest in questList) {
        const questReqs = questList[quest].requirements || false;

        if(!questReqs) {
          possibleQuests.push(quest);
          questList[quest].hasReqs = true;
        } else if(playerType === constants.playerTypes.ironman) {
          const ironmanRequirements = questList[quest].ironman ? questList[quest].ironman : null;

          if(this.playerHasRequirements(questReqs, playerStats, ironmanRequirements)) {
            possibleQuests.push(quest);
            questList[quest].hasReqs = true;
          } else {
            notPossibleQuests.push(quest);
          }
        } else {
          if(this.playerHasRequirements(questReqs, playerStats)) {
            possibleQuests.push(quest);
            questList[quest].hasReqs = true;
          } else {
            notPossibleQuests.push(quest);
          }
        }
      }

      // We sort quests by their status.
      questList.sort((a, b) => b.hasReqs - a.hasReqs );

      this.setState({possibleQuests: possibleQuests, showQuests: true, errors: ''});
    }).catch((e) => {
      if(e.response) {
        if(e.response.status === 404) {
          this.setState({errors: 'Player Not found.'});
        } else {
          this.setState({errors: 'Service Error.'});
        }
      } else {
        this.setState({errors: 'Unexpected error.'});
      }
    });
  }

  render = () => {
    return (
      <div className="container">
        <h3 className="center-text">Osrs Quest Calculator</h3>
        <PlayerBar playerTypes={constants.playerTypes}  calculateQuests={this.getPlayerInfo}/>
        { this.state.errors.length > 0 &&
        <div className="alert alert-danger custom-margin" role="alert">{this.state.errors}</div>
        }
        <div className="row custom-margin">
        <div className="col-sm quests-list">
            { this.state.showQuests && 
            <QuestList questList={questList} possibleQuests={this.state.possibleQuests} questDetailsHandler={this.getQuestDetails}/>
            }
        </div>
        { this.state.showQuestDetails && 
            <div className="col-sm"><QuestDetails quest={this.state.questToShow}/></div>
        }
        </div>
    </div>
    );
  }
}

export default Quests;
