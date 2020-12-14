// const { Channel } = require("discord.js");
const util = require("../util/util");
const rolelistChannel = require ('../config.json').rolelistChannel;
const newsrolecheck = require("../util/newsrolecheck");
module.exports = async (client, messageReaction, user) => {
    if(user.bot){
        return;
    }

    if(messageReaction.message.channel.id === rolelistChannel){
        const Reactionemoji = messageReaction.emoji.name;

        let roleName;
        if (client.ListRoles[Reactionemoji]) {
            roleName = client.ListRoles[Reactionemoji].split('-')[0];
        } else if (client.ListChannels[Reactionemoji]) {
            roleName = client.ListChannels[Reactionemoji].split('-')[0];
        }

        if(!roleName){
            return;
        }
        
        const role = util.getRoleByName(client, roleName);
        const member = util.getMemberById(client, user.id);
        member.roles.add(role)

        client.setTimeout(newsrolecheck, 1000, client, member);
        return;
    }
    return;   
};