import React, { Component } from 'react';

class QuestDetails extends Component {
  render = () => {
    let requirements = this.props.quest.requirements ? Object.keys(this.props.quest.requirements).map((item, index) => {
      return <li key={index}>{item} - {this.props.quest.requirements[item]}</li>
    }) : <li>No Requirements.</li>;

    return (
      <div className="card custom-margin">
        <h5 className="card-header">{this.props.quest.name} <span className="badge badge-secondary">{this.props.quest.length}</span></h5>
        <div className="card-body">
          { requirements &&
            <ul>
              {requirements}
            </ul>
          }
          { this.props.quest.notes &&
            <p className="no-margin">Notes: {this.props.quest.notes}</p>
          }
        </div>
      </div>
    );
  }
}

export default QuestDetails;