const Commando = require('discord.js-commando');
const path = require('path');
const discord = require('discord.js');
const ownerIds = require("./config.json").OwnerIds;
const client = new Commando.Client({
    commandPrefix: '-',
    owner: ownerIds,
    disableEveryone: true
});
const token = require("./config.json").token;
const fs = require('fs');



/* Trackers - used to track various bot states etc */
client.muted = []; //muted users are here


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['reactions', 'ImageReactions'],
        ['moderation', 'Moderation'],
        ['admin', 'Admin'],
        ['misc', 'Misc']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({ 
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

function readEvents() {
    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        let eventNumber = 0;
        console.log('\nEvents loading...');
        files.forEach(file => {
            try {
                const event = require(`./events/${file}`);
                let eventName = file.split(".")[0];
                ++eventNumber;
                client.on(eventName, event.bind(null, client));
                delete require.cache[require.resolve(`./events/${file}`)];
            } catch (err) {
                console.log(`Could not load event: ${file}\n   ${err}`);
            }
        });
        console.log(`${eventNumber} events loaded!`);
    });
}

readEvents();

client.login(token);