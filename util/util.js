module.exports = {
    getRoleByName: function(client, roleName) { 
        getRole = client.guilds.cache.first().roles.cache.find(role => role.name == roleName);
        return getRole;
    },

    getEmojiByName: function(client, emojiName) { 
        getEmoji = client.emojis.cache.find(emoji => emoji.name === emojiName);
        return getEmoji;
    },

    getChannelById: function (client, channelid) { 
        getChannel = client.channels.cache.find(channel => channel.id === channelid);
        return getChannel;
    },

    getMemberById: function (client, userid){
        getMember = client.guilds.cache.first().members.cache.find(member => member.id === userid);
        return getMember;
    }
};
  
  
  
