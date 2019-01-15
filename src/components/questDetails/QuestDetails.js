import React, { Component } from 'react';

class QuestDetails extends Component {
  render = () => {
    let requirements = this.props.quest.requirements ? Object.keys(this.props.quest.requirements).map((item, index) => {
      return <li key={index}>{item} - {this.props.quest.requirements[item]}</li>
    }) : null;

    return (
      <div className="row">
        <h5>{this.props.quest.name} <span className="badge badge-secondary">{this.props.quest.length}</span></h5>
        { requirements &&
          <ul>
            {requirements}
          </ul>
        }
        { this.props.quest.notes &&
          <p>Notes: {this.props.quest.notes}</p>
        }
        
      </div>
    );
  }
}

export default QuestDetails;