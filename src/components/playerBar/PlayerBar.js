import React, { Component } from 'react';
import axios from 'axios';

class PlayerBar extends Component {
    constructor() {
        super();

        this.state = {
            playerType: 'normal',
            playerName: ''
        };
    }

    getQuestsInfo = (e) => {
        console.log('Request for: ' + this.state.playerName + ', type: ' + this.state.playerType);
    }

    handleChange = (e) => {
        const itemName = e.target.name,
            itemValue = e.target.value;

        this.setState({ [itemName]: itemValue });
    }

    render() {
        return(
            <div className="player-bar">
                <select name="playerType" id="playerType" value={this.state.type} onChange={this.handleChange}>
                    <option value="normal">Normal</option>
                    <option value="ironman">Ironman</option>
                </select>
                <input type="text" name="playerName" id="playerName" value={this.state.playerName} onChange={this.handleChange}/>
                <button onClick={this.getQuestsInfo}>Get</button>
            </div>
        );
    }
}

export default PlayerBar;