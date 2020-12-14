const Discord = require("discord.js");
const { getEmojiByName, getChannelById } = require("./util");
const rolelistChannel = require ('../config.json').rolelistChannel;
const util = require('./util');

let addReactions = (message, reactions) => {    
    message.react(reactions[0]);
    reactions.shift();
    if(reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 1000);
    }
}
    
module.exports = async (client) => {


    
    const RoleListEmbed = new Discord.MessageEmbed()
        .setTitle(`__**News Feed Channels!!**__`)
        .setDescription(`React here to be given the following roles and access to channels.\nTo remove yourself, simply unreact (you may have to react and unreact if reactions have been cleared\n`)
        // .addField(`__**Self Assign Roles**__`, '\u200b')
        // .addField(`====================`, `\u200b`);
        // .setDescription(emoji.animated ? `Animated` : "")
        // .setColor(creator.displayHexColor)
        // .setThumbnail(`${emoji.url}`)
        // .setAuthor(`Self Assign Roles`, `${client.user.displayAvatarURL({dynamic: true})}`)
        // .setFooter(`Added by: ${creator.tag}`, `${creator.displayAvatarURL({ dynamic: true})}`)

    // adding Roles
    let embedRolesText = ''; 
    const RoleReactions = [];

    for (const key in client.ListRoles) {

        const emoji = getEmojiByName(client, key);
        RoleReactions.push(emoji);

        const roleName = util.getRoleByName(client, client.ListRoles[key].split('-')[0]);
        const description = client.ListRoles[key].split('-')[1]; 
        
        embedRolesText += `${emoji} ${roleName} - ${description}`;       
    };
    RoleListEmbed.addField(`\u200b`, `__**Self Assign Roles**__`, false);
    RoleListEmbed.addField(`\u200b`, embedRolesText);
        
    // adding channels
    let embedChannelsEmojiRole = '';
    let embedChannelsChannelName = '';
    let embedChannelsDesc = '';
    const ChannelReactions = [];   

    for (const key in client.ListChannels) {

        const emoji = getEmojiByName(client, key);
        ChannelReactions.push(emoji);

        const role = util.getRoleByName(client, client.ListChannels[key].split('-')[0]);
        const roleChannel = util.getChannelById(client, client.ListChannels[key].split('-')[1]); 
        const description = client.ListChannels[key].split('-')[2]; 

        embedChannelsEmojiRole += `${emoji} ${role}\n`;
        embedChannelsChannelName += `${roleChannel}${description ? ` - ${description}` : ``}\n`;
        // embedChannelsDesc += `${ description ? `${description}` : `\u200b`}\n`;
    }
    RoleListEmbed.addField(`\u200b`, `__**Self Assign Channels**__`, false);
    RoleListEmbed.addField(`\u200b`, embedChannelsEmojiRole, true);
    RoleListEmbed.addField(`\u200b`, embedChannelsChannelName, true);
    // RoleListEmbed.addField(`\u200b`, embedChannelsDesc, true);

    
    //sending the embed
    let channel = getChannelById(client, rolelistChannel);
    
    channel.messages.fetch().then((messages) => {
        if(messages.size == 0){
            //send new msg 
            channel.send(RoleListEmbed).then(message => {
                addReactions(message,RoleReactions);
                addReactions(message,ChannelReactions);
            });
        } else {
            for (const message of messages) {
            // //     console.log(`=====\n${message.content}\n=====\n`);
            message[1].edit(RoleListEmbed);
                //  message[1].edit(RolesEmbed);
            addReactions(message[1], RoleReactions);
            addReactions(message[1], ChannelReactions);
            }
        }
    });
}
