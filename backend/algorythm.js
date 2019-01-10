const { constants, hiscores } = require("osrs-api");
const fs = require('fs');

let questList = JSON.parse(fs.readFileSync('quests.json','utf8'));
let possibleQuests = [], notPossibleQuests = [];

let playerInfo = {
    name: "tilaa",
    type: constants.playerTypes.normal
};

function playerHasRequirements(requirements, playerStats) {
    for(const req in requirements) {
        if(requirements[req] > parseInt(playerStats[req].level)) {
            return false;
        }
    }

    return true;
}

hiscores.getPlayer(playerInfo).then((playerStats) => {
    for(const quest in questList) {
        const questReqs = questList[quest].requirements || false;

        if(!questReqs) {
            possibleQuests.push(quest);
        } else {
            if(playerHasRequirements(questReqs, playerStats)) {
                possibleQuests.push(quest);
            } else {
                notPossibleQuests.push(quest);
            }
        }
    }

    console.log('Can: ', possibleQuests);
    console.log('Cannot: ', notPossibleQuests);
    process.exit(0);
}).catch(console.error);

/*
getPlayerInfo(playerInfo).then((playerStats) => {
    console.log(`Stats for ${playerInfo.name}   ->    `, playerStats);
});

async function getPlayerInfo(playerInfo) {
    try {
        const output = await hiscores.getPlayer(playerInfo);
        
        return output;
    } catch(err) {
        throw err
    }
}
*/