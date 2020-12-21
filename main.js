const Discord = require('discord.js');

const client = new Discord.Client();

const targetChannel = client.channels.cache.find(channel => channel.id === 789623909044977695);

client.once('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.channel == targetChannel) {
        message.react('📒');
        console.log(message.content);
    }
})

const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');
client.login(token);