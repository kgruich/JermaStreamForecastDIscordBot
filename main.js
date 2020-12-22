const Discord = require('discord.js');

const client = new Discord.Client();

const targetChannelId = 789623909044977695;

client.once('ready', () => {
    console.log('I am ready!');
});

function cutout2Char(origString, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 2);
      
    let newString = firstPart + lastPart;
    return newString;
}

function messageToTime(m) {

    var rawText = String(m.content).toLowerCase();
    console.log(rawText);
    var amSearch = rawText.search("am");
    var pmSearch = rawText.search("pm");
    var timeIndex;
    if (amSearch + pmSearch === -2) {
        console.log(amSearch);
        console.log(pmSearch);
        return 'N/A';
    }

    var amCount = 0;
    var pmCount = 0;
    var cutText;
    while (amSearch !== -1 || pmSearch !== -1) {
        if (amSearch !== -1) {
            amCount++;
            
            var possibleTime = rawText.charAt(amSearch - 1);
            if (possibleTime.toLowerCase() === possibleTime.toUpperCase()) {
                timeIndex = amSearch - 1;

                if (timeIndex === 0) {
                    return rawText.slice(timeIndex - 3, timeIndex);
                }

                return timeIndex;
            }

            cutText = cutout2Char(rawText, amSearch);
            
            
            console.log(amCount + " am count");
        }
        if (pmSearch !== -1) {
            pmCount++;

            var possibleTime = rawText.charAt(pmSearch - 1);
            if (possibleTime.toLowerCase() === possibleTime.toUpperCase()) {
                timeIndex = pmSearch - 1;

                if (timeIndex === 0) {
                    return rawText.slice(timeIndex - 3, timeIndex);
                }

                return timeIndex;
            }
            else {
                cutText = cutout2Char(rawText, pmSearch);

                console.log(pmCount + " pm count");
            }
        }
        amSearch = cutText.search("am");
        pmSearch = cutText.search("pm");
    }
    console.log(cutText + " CUT TEXT");
    return 'N/A';
}

function checkIfLiveMessage(m) {

}

function getMessageTime(m) {

}

client.on('message', message => {
    if (message.channel.id == targetChannelId) {
        message.react('📒');

        var timeEstimate;
        var timeActual;
        timeEstimate = messageToTime(message);
        console.log(timeEstimate);

        if (timeEstimate === 'N/A') {
            if (checkIfLiveMessage(message)) {
                timeActual = getMessageTime(message);
            }
        }
    }
})

const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');
client.login(token);