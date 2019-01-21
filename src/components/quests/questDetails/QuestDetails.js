import React, { Component } from 'react';

class QuestDetails extends Component {
  render = () => {
    let requirements = this.props.quest.requirements ? Object.keys(this.props.quest.requirements).map((item, index) => {
      return <li key={index}>{item} - {this.props.quest.requirements[item]}</li>
    }) : <li>No Requirements.</li>,
      questsRequired = this.props.quest.quests ? Object.keys(this.props.quest.quests).map((item, index) => {
        return <li key={index}>{this.props.quest.quests[item]}</li>
      }) : null;

    return (
      <div className="card">
        <h5 className="card-header">{this.props.quest.name} <span className="badge badge-secondary">{this.props.quest.length}</span></h5>
        <div className="card-body quests-reqs">
          { requirements &&
            <div>
              <h5>Requirements:</h5>
              <ul>
                {requirements}
              </ul>
            </div>
          }
          {
            this.props.quest.quests &&
            <div>
              <h5>Quests:</h5>
              <ul>
                {questsRequired}
              </ul>
            </div>
          }
          { this.props.quest.notes &&
            <p className="no-margin"><b>Notes:</b> {this.props.quest.notes}</p>
          }
        </div>
      </div>
    );
  }
}

export default QuestDetails;