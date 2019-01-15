import React, { Component } from 'react';

class QuestList extends Component {
  render = () => {
    let questList = this.props.questList.map((quest, index) => {
      if (quest.hasReqs) {
        return (
          <li key={index} data-id={index} onClick={this.props.questDetailsHandler} className="list-group-item list-group-item-action list-group-item-success">{quest.name}</li>
        );
      } else {
        return (
          <li key={index} data-id={index} onClick={this.props.questDetailsHandler} className="list-group-item list-group-item-action list-group-item-danger">{quest.name}</li>
        );
      }
    });

    return (
      <div>
        <ul className="list-group custom-margin">
          {questList}
        </ul>
      </div>
    );
  }
}

export default QuestList;