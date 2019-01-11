import React, { Component } from 'react';

class QuestList extends Component {
    render = () => {
        let questList = Object.keys(this.props.questList).map((quest) =>{
            if(this.props.possibleQuests.indexOf(quest) >= 0) {
                return(
                    <li key={quest} className="list-group-item list-group-item-action">{quest}</li>
                );
            } else {
                return(
                    <li key={quest} className="list-group-item list-group-item-action list-group-item-danger">{quest}</li>
                );
            }
        });

        return(
            <div>
                <ul className="list-group">
                    {questList}
                </ul>
            </div>
        );
    }
}

export default QuestList;