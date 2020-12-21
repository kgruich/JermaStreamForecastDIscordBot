const Discord = require('discord.js');

const client = new Discord.Client();

const targetChannelId = 789623909044977695;

client.once('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.channel.id == targetChannelId) {
        message.react('📒');
    }
})

const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');
client.login(token);