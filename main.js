//whole script strict mode, for fun and for optimization
'use strict'

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

    var rawText = m.content.toLowerCase();
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
    var time = new Time();

    //while loop in case there are multiple 'am' or 'pm' cutting them from the text and running the loop again
    while (amSearch !== -1 || pmSearch !== -1) {
        if (amSearch !== -1) {
            amCount++;
            
            var possibleTime = cutText.charAt(amSearch - 1);
            if (possibleTime.toLowerCase() === possibleTime.toUpperCase()) {
                timeIndex = amSearch - 1;
                time.hr = possibleTime;
                time.min = 0;
                time.period = false;

                //check for 0 am format
                if (possibleTime == ' ' && cutText.charAt(timeIndex - 1).toLowerCase() === cutText.charAt(timeIndex - 1).toUpperCase()) {
                    //check for 0:00 am format (no support for times that don't end in 0, like 9:35)
                    //TODO: make 2 digit hours work (10, 11, 12) (though they are unlikely to be used)
                    if (cutText.charAt(timeIndex - 1) == 0) {
                        time.hr = cutText.charAt(timeIndex - 4);
                        time.min = cutText.charAt(timeIndex - 2) + cutText.charAt(timeIndex - 1);
                    }
                    else {
                        time.hr = cutText.charAt(timeIndex - 1);
                    }
                }
                //check for 0:00am format
                else if (possibleTime == 0) {
                    time.hr = cutText.charAt(timeIndex - 3);
                    time.min = cutText.charAt(timeIndex - 1) + cutText.charAt(timeIndex);
                }
                
                if (time.hr.toLowerCase() !== time.hr.toUpperCase() || time.min.toString().toLowerCase() !== time.min.toString().toUpperCase()) {
                    time.sts = false;
                    return time;
                }
                time.sts = true;
                
                return time;
            }

            else {
                cutText = cutout2Char(cutText, amSearch);
                
                console.log(amCount + " am count");
            }
        }
        if (pmSearch !== -1) {
            pmCount++;

            var possibleTime = cutText.charAt(pmSearch - 1);
            if (possibleTime.toLowerCase() === possibleTime.toUpperCase()) {
                timeIndex = pmSearch - 1;
                time.hr = possibleTime;
                time.min = 0;
                time.period = true;

                //check for 0 am format
                if (possibleTime == ' ' && cutText.charAt(timeIndex - 1).toLowerCase() === cutText.charAt(timeIndex - 1).toUpperCase()) {
                    //check for 0:00 am format (no support for times that don't end in 0, like 9:35)
                    if (cutText.charAt(timeIndex - 1) == 0) {
                        time.hr = cutText.charAt(timeIndex - 4);
                        time.min = cutText.charAt(timeIndex - 2) + cutText.charAt(timeIndex - 1);
                    }
                    else {
                        time.hr = cutText.charAt(timeIndex - 1);
                    }
                }
                //check for 0:00am format
                else if (possibleTime == 0) {
                    time.hr = cutText.charAt(timeIndex - 3);
                    time.min = cutText.charAt(timeIndex - 1) + cutText.charAt(timeIndex);
                }

                if (time.hr.toLowerCase() !== time.hr.toUpperCase() || time.min.toString().toLowerCase() !== time.min.toString().toUpperCase()) {
                    time.sts = false;
                    return time;
                }
                time.sts = true;

                return time;
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
    time.sts = false;
    return time;
}

//checks if the message is about Jerma going live, returns true if it is
function checkIfLiveMessage(m) {
    var rawText = m.content.toLowerCase();
    if (rawText.search('#stream') === -1) {
        return false;
    }
    else {
        return true;
    }
}

//compare two time objects to find the difference
function timeCompare(timeE, timeA) {
    var difference = new Time();
    var hourDifference = timeE.hr - timeA.hr;
    var minuteDifference = timeE.min - timeA.min;

    difference.hr = hourDifference;
    difference.min = minuteDifference;
    difference.sts = true;

    return difference;
}

//calculated how many minutes late or early
function timeCalculate(diff) {
    var totalMinutes = {
        number: 0,
        status: ''
    };

    totalMinutes.number += (60 * diff.hr);
    totalMinutes.number += diff.min;

    if (totalMinutes.number === 0) {
        totalMinutes.status = 'onTime';
    }
    else if (totalMinutes.number < 0) {
        totalMinutes.status = 'late';
    }
    else {
        totalMinutes.status = 'early'
    }

    return totalMinutes;
}

//actual dicord API interaction
const Discord = require('discord.js');

const client = new Discord.Client();

//the announcements channel I monitor for Jerma updates, forwarded from the Jerma Discord Server
const targetChannelId = 789623849397256204;

client.once('ready', () => {
    console.log('I am ready!');
});

var timeEstimate = new Time();
var timeActual = new Time();
timeActual.sts = false;

client.on('message', message => {
    //make sure it is not a command, or a bot message, and in the correct channel
    if (message.channel.id == targetChannelId && !message.content.startsWith('!') && !message.author.bot) {
        //react so I can verify a message has been tracked
        message.react('📒');

        //if message contains #stream
        if (checkIfLiveMessage(message)) {
            console.log('live message');
            timeActual.dateToTime(message.createdAt);
            timeActual.to24Hour();
            timeActual.sts = true;
            console.log(timeActual.hr + ':' + timeActual.min);
        }
        //if message contains any of the following: X am, X pm, Xam, Xpm, X:XX am, X:XX pm, X:XXam, X:XXpm
        else if (messageToTime(message).sts){
            timeEstimate = messageToTime(message);
            console.log(timeEstimate.hr + ':' + timeEstimate.min + ' ' + timeEstimate.prd);
            timeEstimate.to24Hour();
            console.log(timeEstimate.hr + ':' + timeEstimate.min + ' ' + timeEstimate.prd);
        }
        //likely unnecessary, just in case
        else {
            return;
        }
        if (timeEstimate.sts && timeActual.sts) {
            var difference = timeCalculate(timeCompare(timeEstimate, timeActual));

            console.log(difference.number + ' ' + difference.status);

            timeEstimate.sts = false;
            timeActual.sts = false;
        }
    }
})

const fs = require('fs');
const { time } = require('console');
const token = fs.readFileSync('token.txt', 'utf8');
client.login(token);