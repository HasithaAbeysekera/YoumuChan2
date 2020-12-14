const Commando = require('discord.js-Commando');
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


client.ListRoles = {//News feed roles list. Format emojiname : Role name - description
    seiunhigh :'Among Umas-Claim this role to be pinged for Among Us sessions.'
}

client.ListChannels = {//News feed channel list. Format emojiname : Role name - channelID - description
    woah :'Dokutah-710108520460189706', //arknights
    kongouswear :'Admiral-710111338411589688', //azur lane
    wgfacepalm :"Eternal Return-710110893870022736", //eternal return
    rinwin :'Project Sekai-751699972931452988', //project sekai
    ron :'Punishing Gray Raven-779600957532274748', //punishing gray raven
    reimu :'Shadowverse-710111126658220073', //shadowverse
    suzusmile :'Horse Trainer-710111441503518780- testing', //uma musume
};

client.registry
    .registerDefaultTypes()
    .registerGroups([
        // ['reactions', 'ImageReactions'],
        // ['moderation', 'Moderation'],
        // ['admin', 'Admin'],
        // ['misc', 'Misc']
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