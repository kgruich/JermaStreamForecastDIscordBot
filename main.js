//import custom Time class
const Time = require('./time.js')

//helper functions

//cuts out 2 characters out of a string at the inded (used to cut out pm and am)
function cutout2Char(origString, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 2);
      
    let newString = firstPart + lastPart;
    return newString;
}

//finds the estimated time (with hours, minutes, and the period) in the message
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
    var cutText = rawText;
    var timeDigit;
    while (amSearch !== -1 || pmSearch !== -1) {
        if (amSearch !== -1) {
            amCount++;
            
            var possibleTime = cutText.charAt(amSearch - 1);
            if (possibleTime.toLowerCase() === possibleTime.toUpperCase()) {
                timeIndex = amSearch - 1;
                timeDigit = possibleTime;

                if (timeDigit === 0) {
                    timeDigit = cutText.slice(timeIndex - 3, timeIndex);
                }
                if (timeDigit === ' ') {
                    timeDigit = cutText.slice(timeIndex - 1, timeIndex);
                }

                return timeDigit + 'am';
            }

            cutText = cutout2Char(cutText, amSearch);
            
            
            console.log(amCount + " am count");
        }
        if (pmSearch !== -1) {
            pmCount++;

            var possibleTime = cutText.charAt(pmSearch - 1);
            if (possibleTime.toLowerCase() === possibleTime.toUpperCase()) {
                timeIndex = pmSearch - 1;
                timeDigit = possibleTime;

                if (timeDigit === 0) {
                    timeDigit = cutText.slice(timeIndex - 3, timeIndex);
                    //timeDigit.
                }
                if (timeDigit === ' ') {
                    timeDigit = cutText.slice(timeIndex - 1, timeIndex);
                }

                return timeDigit + 'pm';
            }
            else {
                cutText = cutout2Char(cutText, pmSearch);

                console.log(pmCount + " pm count");
            }
        }
        amSearch = cutText.search("am");
        pmSearch = cutText.search("pm");
    }
    console.log(cutText + " CUT TEXT");
    return 'N/A';
}

//checks if the message is about Jerma going live
function checkIfLiveMessage(m) {

}

//compare date object with Time to find difference
function timeCompare(timeE, timeA) {

}

//acutal dicord API interaction
const Discord = require('discord.js');

const client = new Discord.Client();

//the announcements channel I monitor for Jerma updates, forwarded from the Jerma Discord Server
const targetChannelId = 789623909044977695;

client.once('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.channel.id == targetChannelId && !message.content.startsWith('!') && !message.author.bot) {
        message.react('📒');

        var timeEstimate;
        var timeActual;
        timeEstimate = messageToTime(message);
        console.log(timeEstimate);

        /*
        if (timeEstimate === 'N/A') {
            if (checkIfLiveMessage(message)) {
                timeActual = message.createdAt;
            }
        }
        */
    }
})

const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');
client.login(token);