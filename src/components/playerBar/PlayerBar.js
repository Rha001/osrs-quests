import React, { Component } from 'react';
// import axios from 'axios';

class PlayerBar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playerType: 'normal',
            playerName: ''
        };
    }

    getQuestsInfo = (e) => {
        if(this.state.playerName.length > 0)
            this.props.calculateQuests(this.state.playerName, this.state.playerType);
    }

    handleChange = (e) => {
        const itemName = e.target.name,
            itemValue = e.target.value;

        this.setState({ [itemName]: itemValue });
    }

    render() {// for(let playerType of this.props.playerTypes) {
        let playerTypes = Object.keys(this.props.playerTypes).map((item) => {
            return (
                <option value={item} key={item}>{item}</option>
            );
        });

        return(
            <div className="player-bar">
                <select name="playerType" id="playerType" value={this.state.playerType} onChange={this.handleChange}>
                    {playerTypes}
                </select>
                <input type="text" name="playerName" id="playerName" value={this.state.playerName} onChange={this.handleChange}/>
                <button onClick={this.getQuestsInfo}>Get</button>
            </div>
        );
    }
}

export default PlayerBar;